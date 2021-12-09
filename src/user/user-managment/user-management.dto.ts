import {
  IsEmail,
  IsOptional,
  IsString,
  IsUUID,
  MinLength,
  MaxLength,
  IsNotEmpty,
  ArrayNotEmpty
} from "class-validator";
import { Match } from '@common/decorators/match.decorator';
import { ApiPropertyOptional } from '@nestjs/swagger';

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

  @IsUUID(4, { each: true })
  subscriptions: string[];
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
  @IsString({ message: 'Mobile must be a string' })
  phone: string;

  @IsOptional()
  @IsString()
  display_name: string;

  @IsOptional()
  @IsString()
  avatar: string;

  @IsUUID(4, { each: true })
  subscriptions: string[];
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

export class ChangeUserPasswordDto {
  @IsString()
  password: string;
}
