import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy, VerifiedCallback } from 'passport-jwt';
import { AuthService } from '../auth.service';
import { jwtConstants } from '@common/constants/jwt.constants';
import { UserEntity } from '../../user/user.entity';
import { IJwtPayload } from '@interfaces/auth/IJwtPayload';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly _authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromHeader('jwt-token'),
      secretOrKey: jwtConstants.secret,
    });
  }

  async validate(payload: IJwtPayload, done: VerifiedCallback) {
    const user: UserEntity = await this._authService.validateUser(payload);
    if (!user) return done(new HttpException({ message: 'In Valid Token' }, HttpStatus.UNAUTHORIZED), false);
    if (user.isSuspend) return done(new HttpException({ message: 'Account is suspended' }, HttpStatus.FORBIDDEN));
    if (user.isLoggedOut) return done(new HttpException({ message: 'Token expired' }, HttpStatus.FORBIDDEN));

    return done(null, user, payload.iat);
  }
}
