import { IsNotEmpty, IsString, IsUUID, Length, Matches, MaxLength, MinLength } from 'class-validator';
import { Match } from '@common/decorators/match.decorator';

export class ResetPasswordDto {
  @IsString()
  @MaxLength(25)
  @IsNotEmpty({ message: 'udhId is Required' })
  udhId: string;

  @IsString({ message: 'Passcode must be a string' })
  @Length(4, 4)
  @IsNotEmpty({ message: 'Passcode is required' })
  passcode: string;

  @IsString()
  @MinLength(6)
  @MaxLength(20)
  password: string;

  @IsString()
  @Match('password', { message: 'must math the password' })
  passwordConfirm: string;
}
