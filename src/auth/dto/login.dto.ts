import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class LoginDto {
  @IsString()
  @MaxLength(25)
  @IsNotEmpty({ message: 'udhId is Required' })
  udhId: string;

  @IsString()
  @MinLength(6)
  @MaxLength(20)
  password: string;
}
