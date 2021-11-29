import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthService } from '../../auth/auth.service';
import { IJwtPayload } from '@interfaces/auth/IJwtPayload';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly _auth: AuthService, private readonly _reflector: Reflector) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this._reflector.get<boolean>('isPublic', context.getHandler());
    if (isPublic) return true;

    const roles = this._reflector.getAllAndOverride<string[]>('roles', [context.getHandler(), context.getClass()]);

    const { headers } = context.switchToHttp().getRequest();
    if (!headers['jwt-token']) return false;

    const payload: IJwtPayload = await this._auth.decodeToken(headers['jwt-token']);
    const hasRole: boolean = !roles || roles?.includes(payload.role);
    return !(!payload || !hasRole);
  }
}
