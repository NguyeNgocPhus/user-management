import {EventsHandler, IEventHandler} from "@nestjs/cqrs";
import {InitializeUserEvent} from "../../../../core/application/events/user.event";
import {Mapper} from "@automapper/core";
import {InjectMapper} from "@automapper/nestjs";
import {UserReadModel} from "../../../../core/domain/entities/user.entity";
import { UserRepository} from "../../../repositories/user.repository";
import {RoleRepository} from "../../../repositories/role.repository";


@EventsHandler(InitializeUserEvent)
export class InitializeUserEventHandler implements IEventHandler<InitializeUserEvent> {
    constructor(@InjectMapper() private mapper: Mapper,private userRepository:UserRepository,private roleRepository:RoleRepository) {
    }

    async handle(event: InitializeUserEvent): Promise<any> {
        const user = await this.mapper.map(event, UserReadModel, InitializeUserEvent);
      //  console.log(event);
        const roles = await  this.roleRepository.getRoleByIds(event.roles);
        user.roles = roles;
        return await this.userRepository.createUserAsync(user);
    }
}