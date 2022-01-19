import {AutomapperProfile, InjectMapper} from "@automapper/nestjs";
import {mapFrom, Mapper, MappingProfile, mapWithArguments} from "@automapper/core";
import {CreateRoleRequestDto} from "../../../core/domain/dtos/role/create-role-request.dto";
import {RoleReadModel} from "../../../core/domain/entities/role.entity";
import {Injectable} from "@nestjs/common";
import {CreateRoleCommand} from "../../../core/application/commands/role/create-role.command";
import {currentUserResolver} from "../resolver/current-user.profile";
import {RoleAggregatesRoot} from "../../../core/domain/aggregates/role.aggregates";
import {RoleDto} from "../../../core/domain/dtos/role/role.dto";
import {InitializeRoleEvent} from "../../../core/application/events/role.event";
import {CreateTypeRequestDto} from "../../../core/domain/dtos/type/create-type-request.dto";
import {CreateTypeCommand} from "../../../core/application/commands/type/create-type.command";
import { TypeReadModel } from "src/core/domain/entities/type.entity";
import {TypeDto} from "../../../core/domain/dtos/type/type.dto";

@Injectable()
export class TypeProfile extends  AutomapperProfile{
    constructor(@InjectMapper() public mapper:Mapper) {
        super(mapper);
    }
    mapProfile(): MappingProfile {
        return mapper =>{
            mapper.createMap(CreateTypeRequestDto,CreateTypeCommand)
                .forMember((d)=>d.payload,mapFrom(s=>s))
                .forMember((d)=>d.claim,mapWithArguments(currentUserResolver))
            mapper.createMap(TypeReadModel,TypeDto);


        }
    }
}