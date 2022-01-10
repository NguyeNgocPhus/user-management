import {CommandHandler, ICommandHandler, QueryBus} from "@nestjs/cqrs";
import {ChangePasswordFirstLoginCommand} from "../../../../core/application/commands/user/change-password-first-login.command";
import {GetUserByPhoneNumberQuery} from "../../../../core/application/queries/user/get-user-by-phoneNumber.query";
import {NotFoundException} from "@nestjs/common";
import {UserAggregatesRoot} from "../../../../core/domain/aggregates/user.aggregates";
import {IEventStoreService} from "../../../../core/application/common/service/event-store.interface";
import {FORWARDS, START} from "@eventstore/db-client";
import {PasswordGeneratorService} from "../../../common/services/password/password.service";
import {DataTimeHelper, UuidHelper} from "../../../common/helper";
import {ExpiredUserPasswordException} from "src/core/domain/exceptions/ExpiredUserPassword.exception";
import {Mapper} from "@automapper/core";
import {InjectMapper} from "@automapper/nestjs";
import {UserDto} from "../../../../core/domain/dtos/user/user.dto";
import {IPasswordGeneratorService} from "../../../../core/application/common/service/password.interface";


@CommandHandler(ChangePasswordFirstLoginCommand)
export class ChangePasswordFirstLoginCommandHandler implements ICommandHandler<ChangePasswordFirstLoginCommand> {
    constructor(private queryBus: QueryBus, private eventStoreDb: IEventStoreService,
                private passwordGeneratorService: IPasswordGeneratorService,
                @InjectMapper() private mapper: Mapper
    ) {
    }

    async execute(command: ChangePasswordFirstLoginCommand): Promise<any> {
        const query = new GetUserByPhoneNumberQuery(command.payload.phoneNumber);
        const existUser = await this.queryBus.execute(query);
        if (!existUser) {
            throw new NotFoundException("not find user by phoneNUmber");
        }
        const userAggregateRoot = new UserAggregatesRoot(existUser.id);
        await this.eventStoreDb.aggregateStreamAsync(userAggregateRoot.streamName, userAggregateRoot, FORWARDS, START);
       // console.log(userAggregateRoot)
        if (!userAggregateRoot) {
            throw new NotFoundException("not find user from eventDb");
        }
        if (!await this.passwordGeneratorService.verifyPassword(userAggregateRoot.passwordHashTemporary, command.payload.currentPassword)) {
            throw new NotFoundException({
                message: `Password is incorrect, please try again.`,
                data: command,
            });
        }
        if (!userAggregateRoot.passwordChangeRequired) {
            throw new NotFoundException({
                message: `It seems you are not required to use this function to change password, please use change password function.`,
                data: command,
            });
        }
        const now = DataTimeHelper.getNowUnix();
        if (userAggregateRoot.passwordValidUntilDate < new Date(now)) {
            throw new ExpiredUserPasswordException({
                message: `Your password is expired.`,
                data: command,
            });
        }
        const transactionId = UuidHelper.newUuid();
        const passwordHash = await this.passwordGeneratorService.hashPassword(command.payload.newPassword);
        const passwordHashTemporary = null;
        const passwordValidUntilDate = null;
        const passwordChangeRequired = false;

        userAggregateRoot.updateUserFirstLogin(userAggregateRoot.id, transactionId, passwordHash, passwordHashTemporary,
            passwordChangeRequired, passwordValidUntilDate, command.claim.name, command.claim.id, now
        )
        console.log(userAggregateRoot);
        await this.eventStoreDb.appendStreamAsync(
            userAggregateRoot.streamName,
            userAggregateRoot
        );
        return this.mapper.map(userAggregateRoot,UserDto,UserAggregatesRoot);


    }
}