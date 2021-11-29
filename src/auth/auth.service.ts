import { ConflictException, HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compareSync } from 'bcrypt';
import { Sequelize } from 'sequelize-typescript';
import { InjectModel } from '@nestjs/sequelize';
import { UserService } from '../user/user.service';
import { PasswordReset } from './models/password-reset.model';
import { UserEntity } from '../user/user.entity';
import { USER_TYPES_NO } from '@enums/user-types';
import { CreateResetPasswordDto } from './dto/create-reset-password.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { IAuthResponse } from '@interfaces/auth/IAuthResponse';
import { MessageCodeError } from '@common/errors/message-code-error';
import { IJwtPayload } from '@interfaces/auth/IJwtPayload';
import { RegisterUser } from './dto/register-user.dto';
import { UserModel } from '../user/models/user.model';
import { VerifyPasscodeDto } from './dto/verify-passcode.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(PasswordReset) private readonly _passwordReset: typeof PasswordReset,
    private readonly _sequelize: Sequelize,
    private readonly _usersService: UserService,
    private readonly _jwtService: JwtService,
  ) {}

  /**
   * @description Create New User
   * @param registerUser
   */
  public async createNewUser(registerUser: RegisterUser): Promise<UserModel> {
    const user = await this._usersService.getUserById(registerUser.mobile);
    if (user) throw new ConflictException('User already exists');

    return await this._usersService.createNewUser(registerUser);
  }

  /**
   * @description Verify passcode by given user id and code
   * @param body
   */
  public async verifyPasscode(body: VerifyPasscodeDto): Promise<UserModel | null> {
    return null;
  }

  /**
   * @description Main Auth Service & Return access_token
   * @param loginInfo
   */
  public async auth(loginInfo: LoginDto): Promise<IAuthResponse> {
    const user = await this._usersService.getUserByUdhId(loginInfo.udhId);
    if (user && user.password && compareSync(loginInfo.password, user.password)) {
      return await this.login(user);
    } else {
      throw new HttpException('Incorrect Credentials', HttpStatus.BAD_REQUEST);
    }
  }

  /**
   * @description login to system
   * @param user:UserModel
   */
  public async login(user: UserModel): Promise<IAuthResponse> {
    if (user.isSuspend) throw new MessageCodeError('auth:userAccountIsSuspended');
    const jwtPayload: IJwtPayload = {
      id: user.id,
      role: USER_TYPES_NO[user.userType],
      iat: new Date().getTime() / 1000,
    };

    const accessToken = this._jwtService.sign(jwtPayload);
    if (!accessToken) throw new HttpException('Incorrect Credentials', HttpStatus.BAD_REQUEST);
    await this._usersService.updateLoginDate(user);
    return { authorized: true, access_token: accessToken, user: user as UserEntity };
  }

  /**
   * @description logout
   */
  public async logout(user: UserEntity): Promise<boolean> {
    return this._usersService.setAsLoggedOut(user);
  }

  /**
   * @description  Validate User Decoded From JWT
   */
  public async validateUser(payload: IJwtPayload): Promise<UserEntity> {
    return await this._usersService.validateUser(payload);
  }

  public async decodeToken(token: string): Promise<IJwtPayload | null> {
    try {
      return this._jwtService.decode(token) as IJwtPayload;
    } catch (err) {
      return null;
    }
  }

  /*************************** Forgot Password  ************************/
  /**
   * add forgot password row in to db,
   * @param createResetPasswordDto
   */
  async forgotPassword(createResetPasswordDto: CreateResetPasswordDto): Promise<void> {
    throw new NotFoundException('not implemented');
  }

  /**
   * @description reset password and log in,
   * @param resetPasswordDto
   */
  async resetPassword(resetPasswordDto: ResetPasswordDto): Promise<IAuthResponse> {
    throw new NotFoundException('not implemented');
  }
}
