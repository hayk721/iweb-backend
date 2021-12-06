import { IsEmail, IsString, Matches, MinLength, MaxLength, IsNotEmpty, IsUUID, IsOptional } from 'class-validator';
import { Match } from '@common/decorators/match.decorator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class AuthRequestDto {
  @IsNotEmpty({ message: 'username is required' })
  @IsString()
  @MinLength(3)
  @MaxLength(255)
  username: string;

  @IsString()
  @MinLength(6)
  @MaxLength(20)
  password: string;
}
export class CreateResetPasswordDto {
  @IsNotEmpty({ message: 'Email is required' })
  @IsEmail({}, { message: 'Invalid Email' })
  email: string;
}

export class ResetPasswordDto {
  @IsUUID('4')
  token: string;

  @IsString()
  @MinLength(6)
  @MaxLength(20)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, { message: 'password too weak' })
  password: string;

  @IsString()
  @Match('password', { message: 'must match the password' })
  passwordConfirm: string;
}
export class ChangePasswordDto {
  @IsUUID('4')
  id: string;

  @IsString()
  @MinLength(6)
  @MaxLength(20)
  //  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, { message: 'password too weak' })
  password: string;

  @IsString()
  @Match('password', { message: 'must match the password' })
  passwordConfirm: string;
}
export class ChangeCurrentUserPasswordDto {
  @IsString()
  @MinLength(6)
  @MaxLength(20)
  // @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, { message: 'password too weak' })
  password: string;

  @IsString()
  @Match('password', { message: 'must match the password' })
  passwordConfirm: string;
}

export class CreateUserDto {
  @IsNotEmpty({ message: 'Email is required' })
  @IsEmail({}, { message: 'Invalid Email' })
  email: string;

  @IsNotEmpty({ message: 'Password is required' })
  @IsString()
  @MinLength(6)
  @MaxLength(20)
  password: string;

  @IsUUID('4')
  roleId: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  display_name: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  phone: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  avatar: string;
}
