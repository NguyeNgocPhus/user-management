import {CanActivate, ExecutionContext, ForbiddenException, Injectable} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Observable } from 'rxjs';

@Injectable()
export class PermissionGuards implements CanActivate {
  constructor(private reflector: Reflector) {}




  canActivate(context: ExecutionContext): any {
    const permissions = this.reflector.get<string[]>(
      'PERMISSIONS',
      context.getHandler(),
    );
    const ctx = GqlExecutionContext.create(context);
    const { req } = ctx.getContext();
    if (!permissions || permissions.length === 0) {
      throw new ForbiddenException({
        error: "Forbidden resource",
        requiredPermissions: [...permissions]
      })
    }
   // console.log(req.user)
    const checkPerm = permissions.some((p) => req.user.permission.indexOf(p)>-1)
    if(!checkPerm){
      throw new ForbiddenException({
        error: "Forbidden resource",
        requiredPermissions: [...permissions]
      })
    }
    return true;

  }
}
