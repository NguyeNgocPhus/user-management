import {} from '@nestjs/common';
import { Query, Resolver } from '@nestjs/graphql';
import {Claims} from "./infrastructure/common/authentication/claims/claims";
import {UuidHelper} from "./infrastructure/common/helper";
import {JwtService} from "@nestjs/jwt";

@Resolver()
export class AppResolver {
  constructor(private jwtService : JwtService) {}


}
