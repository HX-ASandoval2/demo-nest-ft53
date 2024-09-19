import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { Role } from 'src/role.enum';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    //? Obtener el rol desde la metadata de la request:
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>('roles', [
      context.getHandler(),
      context.getClass(),
    ]);

    const request = context.switchToHttp().getRequest();

    const user = request.user;

    //? Validar el rol del usuario:
    const hasRole = () =>
      requiredRoles.some((role) => user?.roles?.includes(role));

    const valid = hasRole();

    if (!valid)
      throw new ForbiddenException(
        'No tienes permiso para acceder a esta ruta',
      );

    return valid;
  }
}
