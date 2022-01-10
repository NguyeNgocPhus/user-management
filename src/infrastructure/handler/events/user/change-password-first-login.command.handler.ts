import {EventsHandler, IEventHandler} from "@nestjs/cqrs";
import {ChangePasswordFirstLoginEvent} from "../../../../core/application/events/user.event";
import {InjectMapper} from "@automapper/nestjs";
import {Mapper} from "@automapper/core";
import { UserReadModel } from "src/core/domain/entities/user.entity";
import {UserRepository} from "../../../repositories/user.repository";


@EventsHandler(ChangePasswordFirstLoginEvent)
export class ChangePasswordFirstLoginCommandHandler implements  IEventHandler {
    constructor(@InjectMapper() private  mapper :Mapper,private userRepository:UserRepository) {
    }
    async handle(event: ChangePasswordFirstLoginEvent): Promise<any> {
        const user = this.mapper.map(event, UserReadModel, ChangePasswordFirstLoginEvent);
        return await this.userRepository.updatePasswordAtFirstLoginAsync(user);
    }
}