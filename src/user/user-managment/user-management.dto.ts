import {
  IsEmail,
  IsEnum,
  IsObject,
  IsOptional,
  IsString,
  Length,
  IsUUID,
  IsBoolean,
  MinLength,
  MaxLength,
  IsNumber,
} from 'class-validator';
import { Match } from '@common/decorators/match.decorator';

export class CreateUserDto {
  @IsUUID()
  roleId: string;

  @IsString({ message: 'Email must be a string' })
  @IsEmail({}, { message: 'Invalid Email' })
  @IsOptional()
  email: string;

  @IsString({ message: 'Password must be string' })
  password: string;

  @IsString({ message: 'First Name must be a string' })
  @Length(3, 15, { message: 'First Name min: 3, max: 15' })
  firstName: string;

  @IsString({ message: 'Last Name must be a string' })
  @Length(3, 15, { message: 'Last Name min: 3, max: 15' })
  lastName: string;

  @IsString({ message: 'Mobile must be a string' })
  @IsOptional()
  mobileNumber: string;

  @IsBoolean()
  @IsOptional()
  isSuspend: boolean;

  @IsNumber()
  identityId: number;
}

export class EditUserDto {
  @IsOptional()
  @IsUUID()
  roleId: string;

  @IsOptional()
  @IsString({ message: 'Email must be a string' })
  @IsEmail({}, { message: 'Invalid Email' })
  email: string;

  @IsOptional()
  @IsString({ message: 'Password must be string' })
  password: string;

  @IsOptional()
  @IsString({ message: 'First Name must be a string' })
  @Length(3, 15, { message: 'First Name min: 3, max: 15' })
  firstName: string;

  @IsOptional()
  @IsString({ message: 'Last Name must be a string' })
  @Length(3, 15, { message: 'Last Name min: 3, max: 15' })
  lastName: string;

  @IsOptional()
  @IsString({ message: 'Mobile must be a string' })
  mobileNumber: string;

  @IsBoolean()
  @IsOptional()
  isSuspend: boolean;
}

export class ChangePasswordDto {
  @IsString()
  @MinLength(6)
  @MaxLength(20)
  // @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, { message: 'password too weak' })
  password: string;

  @IsString()
  @Match('password', { message: 'must match the password' })
  passwordConfirm: string;
}
export class ChangeUserRoleDto {
  @IsUUID()
  userId: string;

  @IsString()
  role: string;
}

export class ChangeUserSuspendDto {
  @IsUUID()
  userId: string;

  @IsBoolean()
  suspend: boolean;
}

export class ChangeUserPasswordDto {
  @IsString()
  password: string;
}
