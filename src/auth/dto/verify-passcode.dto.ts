import { IsNotEmpty, IsString, IsUUID, Length, MaxLength } from 'class-validator';

export class VerifyPasscodeDto {
  @IsString()
  @MaxLength(25)
  @IsNotEmpty({ message: 'udhId is Required' })
  udhId: string;

  @IsString({ message: 'Passcode must be a string' })
  @Length(4, 4)
  @IsNotEmpty({ message: 'Passcode is required' })
  passcode: string;
}
