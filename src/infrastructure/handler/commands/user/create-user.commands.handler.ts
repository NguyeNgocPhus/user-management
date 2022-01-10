import {createUserCommands} from 'src/core/application/commands/user/create-user.command';
import {CommandHandler, EventBus, EventPublisher, ICommandHandler, QueryBus} from '@nestjs/cqrs';
import {UserRepository} from 'src/infrastructure/repositories/user.repository';
import {GetUserByPhoneNumberOrEmailQuery} from "../../../../core/application/queries/user/get-user-by-phoneNumber-or-Email.query";
import {DuplicatedItemException} from 'src/core/domain/exceptions/DuplicatedItem.exception';
import {UserAggregatesRoot} from "../../../../core/domain/aggregates/user.aggregates";
import {DataTimeHelper, UuidHelper} from "../../../common/helper";
import {UserStatus} from "../../../../core/domain/common/enum/user.status";
import {Mapper} from "@automapper/core";
import {UserDto} from "../../../../core/domain/dtos/user/user.dto";
import {InjectMapper} from "@automapper/nestjs";
import {IPasswordGeneratorService} from 'src/core/application/common/service/password.interface';
import {IEventStoreService} from "../../../../core/application/common/service/event-store.interface";


@CommandHandler(createUserCommands)
export class createUserCommnadHandler
    implements ICommandHandler<createUserCommands> {
  constructor(private userRepository: UserRepository,
              private queryBus: QueryBus,
              private eventBus: EventBus,
              @InjectMapper() private mapper: Mapper,
              private passwordGeneratorService: IPasswordGeneratorService,
              private eventStoreDb : IEventStoreService
              ) {
  }

  async execute(command: createUserCommands): Promise<any> {

    const query = new GetUserByPhoneNumberOrEmailQuery(command.payload.phoneNumber, command.payload.email);

    const existUser = await this.queryBus.execute(query);
    if (existUser) {
      throw  new DuplicatedItemException({
        message: "duplicate item",
        data: command,
      })
    }

    const userAggregates = new UserAggregatesRoot(UuidHelper.newUuid());
    const now = DataTimeHelper.getNowUnix();
    const Datenow = new Date(now);
    const transactionId = UuidHelper.newUuid();
    const passwordRandom = this.passwordGeneratorService.generateRandomPassword();
    const passwordHashTemporary = await this.passwordGeneratorService.hashPassword(passwordRandom);
    userAggregates.initialize(
        userAggregates.id,
        command.payload.name,
        command.payload.normalizedName,
        command.payload.email,
        command.payload.phoneNumber,
        UserStatus.Active,
        command.claim.name,
        command.claim.id,
        now,
        command.claim.id,
        command.claim.name,
        now,
        transactionId,
        command.payload.roles,
        "avatar.com",
        true,
        Datenow,
        passwordHashTemporary,
        Datenow,
        passwordHashTemporary,
        true,
        0
    )
    await  this.eventStoreDb.startStreamAsync(userAggregates.streamName,userAggregates);
    const userDto =  this.mapper.map(userAggregates, UserDto, UserAggregatesRoot);
    userDto.passwordTemporary = passwordRandom;
    return userDto;
  }
}
