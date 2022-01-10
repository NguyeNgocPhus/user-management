import {ChangePasswordCommand} from "../../../../core/application/commands/user/change-password.command.handler";
import {CommandHandler, ICommandHandler, QueryBus} from "@nestjs/cqrs";
import {GetUserByPhoneNumberQuery} from "../../../../core/application/queries/user/get-user-by-phoneNumber.query";
import {NotFoundException} from "@nestjs/common";
import {UserAggregatesRoot} from "../../../../core/domain/aggregates/user.aggregates";
import {IEventStoreService} from "../../../../core/application/common/service/event-store.interface";
import { FORWARDS, START } from "@eventstore/db-client";
import {IPasswordGeneratorService} from "../../../../core/application/common/service/password.interface";
import {DataTimeHelper, UuidHelper} from "src/infrastructure/common/helper";
import { UserDto } from "src/core/domain/dtos/user/user.dto";
import {Mapper} from "@automapper/core";
import {InjectMapper} from "@automapper/nestjs";


@CommandHandler(ChangePasswordCommand)
export class ChangePasswordCommandHandler implements ICommandHandler<ChangePasswordCommand>{
    constructor(private queryBus :  QueryBus,private eventStoreService:IEventStoreService ,
                private passwordService : IPasswordGeneratorService,
                @InjectMapper() private mapper:Mapper
                ) {
    }

    async execute(command: ChangePasswordCommand): Promise<any> {
     //   console.log(command)
        const query = new GetUserByPhoneNumberQuery(command.payload.phoneNumber);
        const existedUser  = await  this.queryBus.execute(query);

        if(!existedUser){
            throw new NotFoundException("something wrong")
        }
        const userAggregateRoot =  new UserAggregatesRoot(command.claim.id);
        await this.eventStoreService.aggregateStreamAsync(
            userAggregateRoot.streamName,
            userAggregateRoot,
            FORWARDS,
            START
        );
        if (userAggregateRoot == null) {
            throw new NotFoundException(`User-${command.claim.id} does not exist`);
        }

        if(!await  this.passwordService.verifyPassword(userAggregateRoot.passwordHash,command.payload.currentPassword)){
            throw new NotFoundException({
                message: `Password is incorrect, please try again.`,
                data: command,
            });
        }
        const transactionId = UuidHelper.newUuid();

        const passwordHash = await this.passwordService.hashPassword(
            command.payload.newPassword
        );

        userAggregateRoot.updatePassword(
            userAggregateRoot.id,
            transactionId,
            passwordHash,
            command.claim.name,
            command.claim.id,
            DataTimeHelper.getNowUnix()
        );
        await  this.eventStoreService.appendStreamAsync(userAggregateRoot.streamName,userAggregateRoot);
        return  this.mapper.map(userAggregateRoot, UserDto, UserAggregatesRoot);

    }
}