import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateResetPasswordDto {
  @IsString()
  @MaxLength(25)
  @IsNotEmpty({ message: 'udhId is Required' })
  udhId: string;
}
