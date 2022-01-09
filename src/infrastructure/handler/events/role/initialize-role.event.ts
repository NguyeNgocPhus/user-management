
import {InitializeRoleEvent} from "../../../../core/application/events/role.event";
import {EventsHandler, IEventHandler} from "@nestjs/cqrs";
import {InjectMapper} from "@automapper/nestjs";
import {Mapper} from "@automapper/core";
import {RoleReadModel} from "../../../../core/domain/entities/role.entity";
import {RoleRepository} from "../../../repositories/role.repository";


@EventsHandler(InitializeRoleEvent)
export class InitializeRoleEventHandler implements IEventHandler<InitializeRoleEvent>{
    constructor(@InjectMapper() private mapper : Mapper,private roleRepository:RoleRepository) {
    }

    async handle(event: InitializeRoleEvent): Promise<any> {
        const data = this.mapper.map(event,RoleReadModel,InitializeRoleEvent);

        return await  this.roleRepository.addRoleAsync(data);

    }

}