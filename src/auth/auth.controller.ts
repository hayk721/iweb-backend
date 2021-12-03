import { Controller, Post, Body, Put, Patch, BadRequestException } from '@nestjs/common';
import { IAuthResponse } from '@interfaces/auth/IAuthResponse';
import { AuthService } from './auth.service';
import { MessageCodeError } from '@common/errors/message-code-error';
import { CurrentUser } from '@currentUser';
import { MailService } from '../mail/mail.service';
import { IsPublic } from '@common/decorators/is-public.decorator';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UserService } from '../user/user.service';
import { AuthRequestDto, ChangeCurrentUserPasswordDto, ChangePasswordDto, CreateResetPasswordDto, CreateUserDto, ResetPasswordDto } from './auth.dto';
import { User } from '../user/models/user.model';
import { Roles } from '@userRoles';

@ApiTags('auth')
@Controller('auth')
@ApiBearerAuth()
export class AuthController {
  constructor(private readonly _auth: AuthService, private readonly _user: UserService, private readonly _mail: MailService) {}

  /**
   * @description Log in
   * @param credential
   */
  @IsPublic()
  @Post('login')
  public async login(@Body() credential: AuthRequestDto): Promise<IAuthResponse> {
    if (!credential) {
      throw new MessageCodeError('auth:login:missingInformation');
    } else if (!credential.username) {
      throw new MessageCodeError('auth:login:missingEmail/MRN/Username');
    } else if (!credential.password) {
      throw new MessageCodeError('auth:login:missingPassword');
    }
    try {
      return await this._auth.auth(credential);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Post('logout')
  @ApiBearerAuth('jwt-token')
  public async logOut(@CurrentUser() user: User) {
    if (!user) {
      throw new MessageCodeError('auth:logout:notLoggedIn');
    }
    return await this._auth.logout(user);
  }
  /**
   * change given user Password
   */
  @IsPublic()
  @Put('user/password')
  @Roles('Admin')
  public async changePasswordByUserId(@Body() changePasswordRequest: ChangePasswordDto) {
    return await this._auth.changePassword(changePasswordRequest.id, changePasswordRequest);
  }
  /**
   * changePassword
   */
  @Put('password')
  public async changePassword(@CurrentUser() user: User, @Body() changePasswordRequest: ChangeCurrentUserPasswordDto) {
    return await this._auth.changePassword(user.id, changePasswordRequest);
  }
  /**
   * forgot-password
   */
  @IsPublic()
  @Post('forgot-password')
  public async forgotPassword(@Body() createResetPasswordDto: CreateResetPasswordDto) {
    await this._auth.forgotPassword(createResetPasswordDto);
    return { statusCode: 200, message: "An email with a confirmation token has been sent to the user's email" };
  }
  /**
   * forgot-password
   */
  @IsPublic()
  @Patch('reset-password')
  public async resetPassword(@Body() resetPasswordDto: ResetPasswordDto) {
    return await this._auth.resetPassword(resetPasswordDto);
  }
}
