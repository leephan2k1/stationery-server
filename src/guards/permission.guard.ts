import { Permission, Role } from 'src/common/enums';
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class PermissionsGuard implements CanActivate {
  constructor(private reflector: Reflector) {}
  canActivate(context: ExecutionContext): boolean {
    const requireRoles = this.reflector.getAllAndOverride<Role[]>('roles', [
      context.getHandler(),
      context.getClass(),
    ]);

    const requirePermissions = this.reflector.getAllAndOverride<Permission[]>(
      'permissions',
      [context.getHandler(), context.getClass()],
    );

    if (!requirePermissions && !requireRoles) {
      return true;
    }

    const { user } = context.switchToHttp().getRequest();
    if (!user || !user.roles) return false;

    //check admin
    if (user.roles.some((e) => e === Role.ADMIN)) return true;

    //check employee
    if (user.roles.some((e) => e === Role.EMPLOYEE)) {
      //check permission
      return requirePermissions.some((e) =>
        user.permissions.some((p) => p === e),
      );
    }

    return false;
  }
}
