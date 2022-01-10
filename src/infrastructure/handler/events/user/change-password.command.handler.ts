
import {ChangePasswordCommand} from "../../../../core/application/commands/user/change-password.command.handler";
import {IEventHandler,EventsHandler} from "@nestjs/cqrs";
import {InjectMapper} from "@automapper/nestjs";
import {Mapper} from "@automapper/core";
import {UserReadModel} from "../../../../core/domain/entities/user.entity";
import {UpdatePasswordEvent} from "../../../../core/application/events/user.event";
import {UserRepository} from "../../../repositories/user.repository";


@EventsHandler(UpdatePasswordEvent)
export class ChangePasswordCommandHandler implements IEventHandler<UpdatePasswordEvent>{

    constructor(@InjectMapper() private mapper : Mapper,private userRepository : UserRepository) {
    }
    async handle(event: UpdatePasswordEvent): Promise<any> {
        const user = this.mapper.map(event,UserReadModel,UpdatePasswordEvent);
        return await this.userRepository.updatePassWordAsync(user);
    }
}