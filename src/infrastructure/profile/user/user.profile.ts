import {AutomapperProfile, InjectMapper} from "@automapper/nestjs";
import {Mapper, MappingProfile, mapFrom, mapWithArguments, ignore} from "@automapper/core";
import {Injectable} from "@nestjs/common";
import {CreateUserRequestDto} from "../../../core/domain/dtos/user/create-user-request.dto";
import {createUserCommands} from "../../../core/application/commands/user/create-user.command";
import {currentUserResolver} from "../resolver/current-user.profile";
import {UserReadModel} from "../../../core/domain/entities/user.entity";
import {UserDto} from "../../../core/domain/dtos/user/user.dto";
import {UserAggregatesRoot} from "../../../core/domain/aggregates/user.aggregates";
import {InitializeUserEvent} from "../../../core/application/events/user.event";

@Injectable()
export class UserProfile extends AutomapperProfile {
    constructor(@InjectMapper() public mapper: Mapper) {
        super(mapper);
    }

    mapProfile(): MappingProfile {
        return mapper => {

            mapper.createMap(CreateUserRequestDto, createUserCommands)
                .forMember(d => d.payload, mapFrom(s => s))
                .forMember(d => d.claim, mapWithArguments(currentUserResolver))
            mapper.createMap(UserReadModel,UserDto)
                .forMember(d=>d.email,mapFrom(s=>s.email))
                .forMember(d=>d.name,mapFrom(s=>s.name))
                .forMember(d=>d.normalizedName,mapFrom(s=>s.normalizedName))
            mapper.createMap(UserAggregatesRoot,UserDto)
                .forMember(d=>d.id,mapFrom(s=>s.id))
                .forMember(d=>d.name,mapFrom(s=>s.name))
                .forMember(d=>d.normalizedName,mapFrom(s=>s.normalizedName))
                .forMember(d=>d.status,mapFrom(s=>s.status))
                .forMember(d=>d.email,mapFrom(s=>s.email))
                .forMember(d=>d.phoneNumber,mapFrom(s=>s.phoneNumber))
                .forMember(d=>d.modifiedById,mapFrom(s=>s.modifiedById))
                .forMember(d=>d.modifiedByName,mapFrom(s=>s.modifiedByName))
                .forMember(d=>d.modifiedDate,mapFrom(s=>s.modifiedDate))
                .forMember(d=>d.createdById,mapFrom(s=>s.createdById))
                .forMember(d=>d.createdByName,mapFrom(s=>s.createdByName))
                .forMember(d=>d.createdDate,mapFrom(s=>s.createdDate))
            mapper.createMap(InitializeUserEvent,UserReadModel)
                .forMember(d=>d.id,mapFrom(s=>s.id))
                .forMember(d=>d.name,mapFrom(s=>s.name))
                .forMember(d=>d.normalizedName,mapFrom(s=>s.normalizedName))
                .forMember(d=>d.status,mapFrom(s=>s.status))
                .forMember(d=>d.email,mapFrom(s=>s.email))
                .forMember(d=>d.phoneNumber,mapFrom(s=>s.phoneNumber))
                .forMember(d=>d.modifiedById,mapFrom(s=>s.modifiedById))
                .forMember(d=>d.modifiedByName,mapFrom(s=>s.modifiedByName))
                .forMember(d=>d.modifiedDate,mapFrom(s=>s.modifiedDate))
                .forMember(d=>d.createdById,mapFrom(s=>s.createdById))
                .forMember(d=>d.createdByName,mapFrom(s=>s.createdByName))
                .forMember(d=>d.createdDate,mapFrom(s=>s.createdDate))

        }
    }
}