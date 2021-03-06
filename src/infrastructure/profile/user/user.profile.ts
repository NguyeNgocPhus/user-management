import {AutomapperProfile, InjectMapper} from "@automapper/nestjs";
import {Mapper, MappingProfile, mapFrom, mapWithArguments, ignore} from "@automapper/core";
import {Injectable} from "@nestjs/common";
import {CreateUserRequestDto} from "../../../core/domain/dtos/user/create-user-request.dto";
import {createUserCommands} from "../../../core/application/commands/user/create-user.command";
import {currentUserResolver} from "../resolver/current-user.profile";
import {UserReadModel} from "../../../core/domain/entities/user.entity";
import {UserDto} from "../../../core/domain/dtos/user/user.dto";
import {UserAggregatesRoot} from "../../../core/domain/aggregates/user.aggregates";
import {InitializeUserEvent, UpdatePasswordEvent} from "../../../core/application/events/user.event";
import {ChangePasswordFirstLoginRequestDto} from "../../../core/domain/dtos/user/change-password-first-login-request.dto";
import {ChangePasswordFirstLoginCommand} from "../../../core/application/commands/user/change-password-first-login.command";
import {ChangePasswordRequestDto} from "../../../core/domain/dtos/user/change-passoword-request.dto";
import {ChangePasswordCommand} from "../../../core/application/commands/user/change-password.command.handler";

@Injectable()
export class UserProfile extends AutomapperProfile {
    constructor(@InjectMapper() public mapper: Mapper) {
        super(mapper);
    }

    mapProfile(): MappingProfile {
        return mapper => {
            mapper.createMap(ChangePasswordFirstLoginRequestDto,ChangePasswordFirstLoginCommand)
                .forMember(d => d.payload, mapFrom(s => s))
                .forMember(d => d.claim, mapWithArguments(currentUserResolver))
            mapper.createMap(CreateUserRequestDto, createUserCommands)
                .forMember(d => d.payload, mapFrom(s => s))
                .forMember(d => d.claim, mapWithArguments(currentUserResolver))
            mapper.createMap(ChangePasswordRequestDto, ChangePasswordCommand)
                .forMember(d => d.payload, mapFrom(s => s))
                .forMember(d => d.claim, mapWithArguments(currentUserResolver))
            mapper.createMap(UserReadModel,UserDto)
                .forMember(d=>d.email,mapFrom(s=>s.email))
                .forMember(d=>d.name,mapFrom(s=>s.name))
                .forMember(d=>d.normalizedName,mapFrom(s=>s.normalizedName))
            mapper.createMap(UpdatePasswordEvent,UserReadModel)
                .forMember(d => d.id, mapFrom(s => s.id))
                .forMember(d => d.email, ignore())
                .forMember(d => d.avatarPhoto, ignore())
                .forMember(d =>d.normalizedName,ignore())
                .forMember(d => d.passwordChangeRequired, ignore())
                .forMember(d => d.passwordValidUntilDate, ignore())
                .forMember(d => d.passwordHashTemporary, ignore())
                .forMember(d => d.status, ignore())
                .forMember(d => d.passwordHash, mapFrom(s => s.passwordHash))
                .forMember(d => d.phoneNumber, ignore())
                .forMember(d => d.lockoutEnd,  ignore())
                .forMember(d => d.lockoutEnabled, ignore())
                .forMember(d => d.accessFailCount,  ignore())
                .forMember(d => d.roles, ignore())
                .forMember(
                    (d) => d.modifiedById,
                    mapFrom((s) => s.modifiedById)
                )
                .forMember(
                    (d) => d.modifiedByName,
                    mapFrom((s) => s.modifiedByName)
                )
                .forMember(
                    (d) => d.modifiedDate,
                    mapFrom((s) => s.modifiedDate)
                )
                .forMember((d) => d.createdByName, ignore())
                .forMember((d) => d.createdDate, ignore())
                .forMember((d) => d.createdById, ignore())



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
                .forMember(d => d.normalizedName, mapFrom(s => s.normalizedName))
                .forMember(d => d.status, mapFrom(s => s.status))
                .forMember(d => d.email, mapFrom(s => s.email))
                .forMember(d => d.phoneNumber, mapFrom(s => s.phoneNumber))
                .forMember(d => d.modifiedById, mapFrom(s => s.modifiedById))
                .forMember(d => d.modifiedByName, mapFrom(s => s.modifiedByName))
                .forMember(d => d.modifiedDate, mapFrom(s => s.modifiedDate))
                .forMember(d => d.createdById, mapFrom(s => s.createdById))
                .forMember(d => d.createdByName, mapFrom(s => s.createdByName))
                .forMember(d => d.createdDate, mapFrom(s => s.createdDate))
                .forMember(d => d.avatarPhoto, mapFrom(s => s.avatarPhoto))
                .forMember(d => d.avatarPhoto, mapFrom(s => s.avatarPhoto))
                .forMember(d => d.passwordChangeRequired, mapFrom(s => s.passwordChangeRequired))
                .forMember(d => d.passwordValidUntilDate, mapFrom(s => s.passwordValidUntilDate))
                .forMember(d => d.passwordHash, mapFrom(s => s.passwordHash))
                .forMember(d => d.lockoutEnabled, mapFrom(s => s.lockoutEnabled))
                .forMember(d => d.lockoutEnd, mapFrom(s => s.lockoutEnd))
                .forMember(d => d.passwordHashTemporary, mapFrom(s => s.passwordHashTemporary))
                .forMember(d => d.accessFailCount, mapFrom(s => s.accessFailCount))
            //    .forMember(d => d.passwordHashTemporary, mapFrom(s => s.passwordHashTemporary))




        }
    }
}