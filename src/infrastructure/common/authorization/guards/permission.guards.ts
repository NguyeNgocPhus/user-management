import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
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
    if (!permissions || permissions.length === 0) return true;
    console.log(req.user);
  }
}
