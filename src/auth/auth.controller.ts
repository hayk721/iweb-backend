import { BadRequestException, Body, Controller, Get, Patch, Post, UseGuards, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { MessageCodeError } from '@common/errors/message-code-error';
import { UserService } from '../user/user.service';
import { CurrentUser } from '@currentUser';
import { IAuthResponse } from '@interfaces/auth/IAuthResponse';
import { UserEntity } from '../user/user.entity';
import { CreateResetPasswordDto } from './dto/create-reset-password.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { RegisterUser } from './dto/register-user.dto';
import { VerifyPasscodeDto } from './dto/verify-passcode.dto';
import { LoginDto } from './dto/login.dto';
import { ISuccessResponse } from '@interfaces/response/ISuccessResponse';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '@common/guards/jwt-auth.guard';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly _auth: AuthService, private readonly _user: UserService) {}

  /**
   * @description Register New User
   * @param user: RegisterUser
   */
  @Post('register')
  async register(@Body(new ValidationPipe()) user: RegisterUser): Promise<ISuccessResponse> {
    await this._auth.createNewUser(user);
    return { statusCode: 201, message: 'Sms with passcode sent to user' };
  }

  /**
   * @description Verify mobile number
   * @param body: VerifyPasscodeDto
   */
  @Post('verify-passcode')
  async verifyPasscode(@Body(new ValidationPipe()) body: VerifyPasscodeDto): Promise<ISuccessResponse> {
    const user = await this._auth.verifyPasscode(body);
    if (!user) throw new BadRequestException('Passcode not valid');
    return {
      statusCode: 200,
      message: 'Passcode is valid',
      data: { name: user.name, surname: user.surname, nameAr: user.nameAr, surnameAr: user.surnameAr },
    };
  }

  /**
   * @description Log in to system
   * @param credential
   */
  @Post('login')
  public async login(@Body(new ValidationPipe()) credential: LoginDto): Promise<IAuthResponse> {
    if (!credential) {
      throw new MessageCodeError('auth:login:missingInformation');
    } else if (!credential.udhId) {
      throw new MessageCodeError('auth:login:missingId');
    } else if (!credential.password) {
      throw new MessageCodeError('auth:login:missingPassword');
    }

    return await this._auth.auth(credential);
  }

  /**
   * @description Log out from system
   * @param user: User
   */
  @ApiBearerAuth('jwt-token')
  @Get('logout')
  @UseGuards(JwtAuthGuard)
  public async logOut(@CurrentUser() user: UserEntity): Promise<ISuccessResponse> {
    if (!user) throw new MessageCodeError('auth:logout:notLoggedIn');
    await this._auth.logout(user);
    return { statusCode: 200, message: 'user successfully logs out' };
  }

  /**
   * @description request for password reset
   * @param createResetPasswordDto
   */
  @Post('forgot-password')
  public async forgotPassword(@Body(new ValidationPipe()) createResetPasswordDto: CreateResetPasswordDto): Promise<ISuccessResponse> {
    await this._auth.forgotPassword(createResetPasswordDto);
    return { statusCode: 200, message: 'SMS with confirmation code sent to user' };
  }

  /**
   * @description Set new password
   * @param body: ResetPasswordDto
   */
  @Patch('set-password')
  async setPassword(@Body(new ValidationPipe()) body: ResetPasswordDto): Promise<ISuccessResponse> {
    await this._auth.resetPassword(body);

    return { statusCode: 200, message: 'password set successfully' };
  }
}
