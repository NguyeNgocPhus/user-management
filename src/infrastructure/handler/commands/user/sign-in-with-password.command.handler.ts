import {CommandHandler, ICommandHandler, QueryBus} from "@nestjs/cqrs";
import {SignInWithPasswordCommand} from "../../../../core/application/commands/user/sign-in-with-password-command";
import {GetUserByPhoneNumberQuery} from "../../../../core/application/queries/user/get-user-by-phoneNumber.query";
import {BadRequestException, NotFoundException} from "@nestjs/common";
import {UserAggregatesRoot} from "../../../../core/domain/aggregates/user.aggregates";
import {IEventStoreService} from "../../../../core/application/common/service/event-store.interface";
import {FORWARDS, START} from "@eventstore/db-client";
import {UserStatus} from "../../../../core/domain/common/enum/user.status";
import {UserNotActiveException} from "src/core/domain/exceptions/UserNotActive.exception";
import {IPasswordGeneratorService} from "../../../../core/application/common/service/password.interface";
import {PhoneNumberOrPasswordIncorrectWithoutLockoutException} from "src/core/domain/exceptions/PhoneNumberOrPasswordIncorrectWithoutLockout.exception";
import {DataTimeHelper, UuidHelper} from "../../../common/helper";
import { UserLockedOutDurationMinException } from "src/core/domain/exceptions/UserLockedOutDurationMin.exception";
import {UntilService} from "../../../common/services/until/until.service";
import {JwtService} from "@nestjs/jwt";

@CommandHandler(SignInWithPasswordCommand)
export class SignInWithPasswordCommandHandler implements ICommandHandler<SignInWithPasswordCommand> {
    constructor(private queryBus: QueryBus,
                private eventStoreService: IEventStoreService,
                private passwordService: IPasswordGeneratorService,
                private utilService :  UntilService,
                private jwtService : JwtService
    ) {
    }

    async execute(command: SignInWithPasswordCommand): Promise<any> {
        const query = new GetUserByPhoneNumberQuery(command.phoneNumber);
        const existUser = await this.queryBus.execute(query);
//        console.log(existUser);

        if (!existUser) {
            throw new NotFoundException("sign in fail")
        }

        const userAggregateRoot = new UserAggregatesRoot(existUser.id);

        await this.eventStoreService.aggregateStreamAsync(
            userAggregateRoot.streamName,
            userAggregateRoot,
            FORWARDS,
            START
        );
        if (userAggregateRoot == null)
            throw new NotFoundException({
                message: `User ${userAggregateRoot.streamName} is not found`,
                data: command,
            });

        switch (userAggregateRoot.status) {
            case UserStatus.Inactive:
                throw new UserNotActiveException(
                    {
                        message: "user not active"
                        , data: command
                    });
                break;

        }
        const currentDate = new Date();
        let accessFailedCount = userAggregateRoot.accessFailedCount;
        const transactionId = UuidHelper.newUuid();
        const now = DataTimeHelper.getNowUnix();
        if (!await this.passwordService.verifyPassword(!userAggregateRoot.passwordHashTemporary ? "":userAggregateRoot.passwordHashTemporary , command.password) &&
            !await this.passwordService.verifyPassword(!userAggregateRoot.passwordHash ? "":userAggregateRoot.passwordHash , command.password)
        ) {
            if (!userAggregateRoot.lockOutEnable) {
                throw new PhoneNumberOrPasswordIncorrectWithoutLockoutException({
                    message: "password or email incorrect",
                    data: command
                })
            }
            accessFailedCount += 1;
            userAggregateRoot.updateAccessFailedCount(userAggregateRoot.id, transactionId
                , accessFailedCount, userAggregateRoot.name, userAggregateRoot.id, now)

            if(userAggregateRoot.accessFailedCount === 3){
                const locOutEnd = new Date(currentDate.getTime()+1000*60*30);

                userAggregateRoot.updateLockoutEnd(userAggregateRoot.id, transactionId
                    , locOutEnd, userAggregateRoot.name, userAggregateRoot.id, now);

                await this.eventStoreService.appendStreamAsync(userAggregateRoot.streamName, userAggregateRoot);
                throw new UserLockedOutDurationMinException({
                    message: `Your user has been locked out in ${30} minutes `,
                    data: command,
                });
            }
            await this.eventStoreService.appendStreamAsync(userAggregateRoot.streamName, userAggregateRoot);
            throw new PhoneNumberOrPasswordIncorrectWithoutLockoutException({
                message: "password or email incorrect",
                data: command
            })
        }
        if (userAggregateRoot.lockoutEnd != null && userAggregateRoot.lockoutEnd > currentDate) {
            throw new BadRequestException({
                message: "account user is lockout",
                data: command,
            });
        }
        if (userAggregateRoot.passwordChangeRequired) {
            throw new BadRequestException({
                message: "account not login here",
                data: command,
            });
        }
        const claim = this.utilService.buildClaim(existUser);
        const token=  await this.jwtService.signAsync(JSON.stringify(claim));
        return  token;
    }
}