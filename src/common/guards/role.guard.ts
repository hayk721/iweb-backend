import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthService } from '../../auth/auth.service';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly _auth: AuthService, private readonly _reflector: Reflector) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this._reflector.get<boolean>('isPublic', context.getHandler());
    if (isPublic) return true;

    const roles = this._reflector.getAllAndOverride<string[]>('roles', [context.getHandler(), context.getClass()]);
    const { headers } = context.switchToHttp().getRequest();
    if (!headers['authorization']) return false;

    const payload: any = await this._auth.decodeToken(headers['authorization']);
    const hasRole: boolean = !roles || roles?.includes(payload.role);
    return !(!payload || !hasRole);
  }
}
