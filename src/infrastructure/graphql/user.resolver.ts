import { PermissionGuards } from './../common/authorization/guards/permission.guards';
import { JwtAuthGuard } from './../common/authentication/guards/jwt-auth.guard';
import { CreateUserRequestDto } from './../../core/domain/dtos/user/create-user-request.dto';
import { Resolver, Query, Args, Mutation, Context } from '@nestjs/graphql';
import { UserRepository } from '../repositories/user.repository';
import { CommandBus } from '@nestjs/cqrs';
import {createUserCommands} from 'src/core/application/commands/user/create-user.command';
import {JwtService} from '@nestjs/jwt';
import {Req, UseGuards} from '@nestjs/common';
import {Permissions} from '../common/authorization/decorator/permission.decorator';
import {Claims} from "../common/authentication/claims/claims";
import {UuidHelper} from "../common/helper";
import {PermConst} from "../../core/application/common/constants/perm.constants";
import {Mapper} from "@automapper/core";
import {InjectMapper} from "@automapper/nestjs";
import {UserDto} from 'src/core/domain/dtos/user/user.dto';
import {ChangePasswordFirstLoginRequestDto} from "../../core/domain/dtos/user/change-password-first-login-request.dto";
import {ChangePasswordFirstLoginCommand} from "../../core/application/commands/user/change-password-first-login.command";

@Resolver()
export class UserResolver {
  constructor(
      private userRepository: UserRepository,
      private commandBus: CommandBus,
      private jwtService: JwtService,
      @InjectMapper() private mapper: Mapper
  ) {
  }

  @UseGuards(JwtAuthGuard,PermissionGuards)
  @Permissions(PermConst.ADMIN)
  @Mutation((returns) => UserDto, { description: 'add product async' })
  async AddUserAsync(@Args('params') data: CreateUserRequestDto,@Context() context): Promise<any> {
    const command =await this.mapper.map(data,createUserCommands,CreateUserRequestDto,{extraArguments: {claim:context?.req?.user}})

    const result = await  this.commandBus.execute(command);

    return result;

  }

  @UseGuards(JwtAuthGuard, PermissionGuards)
  @Permissions(PermConst.ADMIN)
  @Mutation((returns) => UserDto, {description: 'change password first login'})
  async ChangePasswordFirstLogin(@Args('params') data: ChangePasswordFirstLoginRequestDto, @Context() context): Promise<String> {
    const command = this.mapper.map(data, ChangePasswordFirstLoginCommand, ChangePasswordFirstLoginRequestDto,
        {extraArguments: {claim: context?.req?.user}});
    const result = await this.commandBus.execute(command);
    return result;
  }

  @Query((returns) => String)
  async createToken() {
    const claims = new Claims();
    claims.id = UuidHelper.newUuid();
    claims.name = "Nguyen Ngoc Phu";
    claims.roles = [];
    claims.permission = ['ADMIN'];
    return await this.jwtService.signAsync(JSON.stringify(claims));
  }
}
