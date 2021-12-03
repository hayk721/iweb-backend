import { BadRequestException, ConflictException, HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { IJwtPayload } from '@interfaces/auth/IJwtPayload';
import { IAuthResponse } from '@interfaces/auth/IAuthResponse';
import { compareSync } from 'bcrypt';
import { v4 as uuid } from 'uuid';
import moment from 'moment';
import { Sequelize } from 'sequelize-typescript';
import { InjectModel } from '@nestjs/sequelize';
import { IPasswordReset } from '@interfaces/auth/IPasswordReset';
import { Transaction } from 'sequelize';
import { MailService } from '../mail/mail.service';
import { UserService } from '../user/user.service';
import { AuthRequestDto, ChangeCurrentUserPasswordDto, ChangePasswordDto, CreateResetPasswordDto, ResetPasswordDto } from './auth.dto';
import { User } from '../user/models/user.model';
import { ROLES } from '@enums/user-types';
import { PasswordReset } from './models/password-reset.model';
import { EmailVerification } from './models/email-verifications.model';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(EmailVerification) private readonly _emailVerification: typeof EmailVerification,
    @InjectModel(PasswordReset) private readonly _passwordReset: typeof PasswordReset,
    private readonly _sequelize: Sequelize,
    private readonly _usersService: UserService,
    private readonly _jwtService: JwtService,
    private readonly _mail: MailService,
  ) {}


  /**
   * @description Main Auth Service & Return access_token
   * @param loginInfo
   */
  public async auth(loginInfo: AuthRequestDto): Promise<IAuthResponse> {
    const user = await this._usersService.getUserByEmail(loginInfo.username);

    if (user && user.password && compareSync(loginInfo.password, user.password)) {
      return await this.login(user);
    } else {
      throw new BadRequestException('Incorrect Credentials');
    }
  }
  /**
   * login
   */
  public async login(user: User): Promise<IAuthResponse> {
    if (!user) throw new NotFoundException('User not Found');
    // if (user.isSuspend) throw new MessageCodeError('auth:userAccountIsSuspended');
    const jwtPayload: IJwtPayload = {
      id: user.id,
      email: user.email,
      role: user.role?.name || ROLES[ROLES.SALES],
      iat: new Date().getTime() / 1000,
    };

    const accessToken = this._jwtService.sign(jwtPayload);
    if (!accessToken) throw new BadRequestException('Incorrect Credentials');
    await this._usersService.updateLoginDate(user);
    return { authorized: true, access_token: accessToken, user };
  }
  /**
   * logout
   */
  public async logout(user: User) {
    return await this._usersService.setAsLoggedOut(user);
  }
  /**
   * @description  Validate User Decoded From JWT
   */
  public async validateUser(payload: IJwtPayload): Promise<User> {
    return await this._usersService.validateUser(payload.id);
  }

  public async changePassword(userId: string, changePasswordRequest: ChangePasswordDto | ChangeCurrentUserPasswordDto) {
    const user = await this._usersService.getUserById(userId);
    if (!user) throw new NotFoundException('User not found');
    return await this._usersService.changePassword(user, changePasswordRequest.password);
  }

  public decodeToken(token: string): IJwtPayload | null {
    try {
      let _token;
      if (token) {
        _token = token.split(' ')[1];
      }
      return this._jwtService.decode(_token) as IJwtPayload;
    } catch (err) {
      console.log(err);
      return null;
    }
  }
  /*************************** Forgot Password  ************************/
  /**
   * add forgot password row in to db,
   * @param createResetPasswordDto
   */
  async forgotPassword(createResetPasswordDto: CreateResetPasswordDto): Promise<PasswordReset> {
    const user: User = await this._usersService.getUserByEmail(createResetPasswordDto.email);
    if (!user) throw new HttpException('user with this email not exists', HttpStatus.NOT_FOUND);
    const passwordReset: IPasswordReset = {
      email: user.email,
      token: uuid(),
    };
    const t: Transaction = await this._sequelize.transaction();
    try {
      const result = await this._passwordReset.create<PasswordReset>(passwordReset, { transaction: t });
      await this._mail.sendPasswordResetRequest(user, passwordReset.token);
      await t.commit();
      return result;
    } catch (err) {
      await t.rollback();
      throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
  /**
   * reset password and log in,
   * @param resetPasswordDto
   */
  async resetPassword(resetPasswordDto: ResetPasswordDto): Promise<IAuthResponse | HttpException> {
    const passwordReset: PasswordReset = await this._passwordReset.findOne<PasswordReset>({
      where: { token: resetPasswordDto.token },
    });
    if (!passwordReset || moment().diff(passwordReset.createdAt, 'hours', true) > 1) {
      throw new HttpException('token has expired', HttpStatus.BAD_REQUEST);
    }
    const user: User = await this._usersService.getUserByEmail(passwordReset.email);
    if (!user) throw new HttpException('user not exists', HttpStatus.NOT_FOUND);

    const t: Transaction = await this._sequelize.transaction();
    try {
      await this._usersService.changePassword(user, resetPasswordDto.password);
      await passwordReset.destroy();
      await t.commit();
      return await this.login(user);
    } catch (err) {
      await t.rollback();
      throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
