import {Args, Context, Mutation, Resolver} from "@nestjs/graphql";
import {CreateRoleRequestDto} from "../../core/domain/dtos/role/create-role-request.dto";
import {InjectMapper} from "@automapper/nestjs";
import {Mapper} from "@automapper/core";
import {RoleRepository} from "../repositories/role.repository";
import {PermConst} from "../../core/application/common/constants/perm.constants";
import {Permissions} from "../common/authorization/decorator/permission.decorator";
import {UseGuards} from "@nestjs/common";
import { JwtAuthGuard } from "../common/authentication/guards/jwt-auth.guard";
import { PermissionGuards } from "../common/authorization/guards/permission.guards";
import { CreateRoleCommand } from "src/core/application/commands/role/create-role.command";
import {CommandBus} from "@nestjs/cqrs";
import { RoleDto } from "src/core/domain/dtos/role/role.dto";
import {CreateTypeRequestDto} from "../../core/domain/dtos/type/create-type-request.dto";
import {CreateTypeCommand} from "../../core/application/commands/type/create-type.command";
import {TypeDto} from "../../core/domain/dtos/type/type.dto";


@Resolver()
export class TypeResolver {
    constructor(@InjectMapper() private mapper:Mapper, private rolerepository:RoleRepository,
                private commandBus : CommandBus) {
    }

    @Mutation(()=>TypeDto)
    @UseGuards(JwtAuthGuard,PermissionGuards)
    @Permissions(PermConst.ADMIN)
    async createType(@Args('params') data: CreateTypeRequestDto,@Context() context ){
        const command =  this.mapper.map(data,CreateTypeCommand,CreateTypeRequestDto,{extraArguments:{claim:context?.req?.user}});

        const result = await  this.commandBus.execute(command);

        return result;

    }
}