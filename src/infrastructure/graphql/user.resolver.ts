import { PermissionGuards } from './../common/authorization/guards/permission.guards';
import { JwtAuthGuard } from './../common/authentication/guards/jwt-auth.guard';
import { LoginRequest } from './../../core/domain/dtos/user/login-request.dto';
import { CreateUserRequestDto } from './../../core/domain/dtos/user/create-user-request.dto';
import { UserDto } from './../../core/domain/dtos/user/user.dto';
import { Resolver, Query, Args, Mutation, Context } from '@nestjs/graphql';
import { CreateProductRequestDto } from 'src/core/domain/dtos/product/create-product-request.dto';
import { ProductDto } from 'src/core/domain/dtos/product/product.dto';
import { UserReposiroty } from '../repositories/user.repository';
import { CommandBus } from '@nestjs/cqrs';
import { createUserCommands } from 'src/core/application/commands/user/create-user.command';
import { JwtService } from '@nestjs/jwt';
import { Req, UseGuards } from '@nestjs/common';
import { LocalAuthGuard } from '../common/authentication/guards/local-auth.guard';
import { CurrentUser } from '../common/authentication/decorator/current-user.decorator';
import { Any } from 'typeorm';
import { Permissions } from '../common/authorization/decorator/permission.decorator';

@Resolver()
export class UserResolver {
  constructor(
    private userRepository: UserReposiroty,
    private commandBus: CommandBus,
    private jwtService: JwtService,
  ) {}

  @Mutation((returns) => String, { description: 'add product async' })
  async AddUserAsync(@Args('params') data: CreateUserRequestDto): Promise<any> {
    const command = new createUserCommands(data);
    const user = await this.userRepository.create(data);

    const result = await this.userRepository.createUserAsync(user);
    const token = await this.jwtService.sign({ id: result.id });

    return token;
  }

  @UseGuards(JwtAuthGuard, PermissionGuards)
  @Permissions('admin')
  @Mutation((returns) => String, { description: 'add product async' })
  async register(@Context() context): Promise<String> {
    return 'ressd';
  }
}
