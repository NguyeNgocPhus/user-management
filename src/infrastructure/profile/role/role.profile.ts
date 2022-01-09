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

@Injectable()
export class RoleProfile extends  AutomapperProfile{
    constructor(@InjectMapper() public mapper:Mapper) {
        super(mapper);
    }
    mapProfile(): MappingProfile {
        return mapper =>{
            mapper.createMap(CreateRoleRequestDto,CreateRoleCommand)
                .forMember((d)=>d.payload,mapFrom(s=>s))
                .forMember((d)=>d.claims,mapWithArguments(currentUserResolver))
            mapper.createMap(RoleAggregatesRoot,RoleDto)
                .forMember((d)=>d.id,mapFrom(s=>s.id))
                .forMember((d)=>d.name,mapFrom(s=>s.name))
                .forMember((d)=>d.code,mapFrom(s=>s.code))
                .forMember((d)=>d.normalizedName,mapFrom(s=>s.normalizedName))
                .forMember((d)=>d.description,mapFrom(s=>s.description))
                .forMember((d)=>d.status,mapFrom(s=>s.status))
                .forMember((d)=>d.modifiedById,mapFrom(s=>s.modifiedById))
                .forMember((d)=>d.modifiedByName,mapFrom(s=>s.modifiedByName))
                .forMember((d)=>d.modifiedDate,mapFrom(s=>s.modifiedDate))
                .forMember((d)=>d.createdById,mapFrom(s=>s.createdById))
                .forMember((d)=>d.createdDate,mapFrom(s=>s.createdDate))
                .forMember((d)=>d.createdByName,mapFrom(s=>s.createdByName))
            mapper.createMap(InitializeRoleEvent,RoleReadModel)
                .forMember((d)=>d.id,mapFrom(s=>s.id))
                .forMember((d)=>d.name,mapFrom(s=>s.name))
                .forMember((d)=>d.code,mapFrom(s=>s.code))
                .forMember((d)=>d.normalizeName,mapFrom(s=>s.normalizedName))
                .forMember((d)=>d.description,mapFrom(s=>s.description))
                .forMember((d)=>d.status,mapFrom(s=>s.status))
                .forMember((d)=>d.modifiedById,mapFrom(s=>s.modifiedById))
                .forMember((d)=>d.modifiedByName,mapFrom(s=>s.modifiedByName))
                .forMember((d)=>d.modifiedDate,mapFrom(s=>s.modifiedDate))
                .forMember((d)=>d.createdById,mapFrom(s=>s.createdById))
                .forMember((d)=>d.createdDate,mapFrom(s=>s.createdDate))
                .forMember((d)=>d.createdByName,mapFrom(s=>s.createdByName))



        }
    }
}