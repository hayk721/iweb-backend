import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class RegisterUser {
  @IsString()
  @MaxLength(25)
  @IsNotEmpty({ message: 'udhId is Required' })
  username: string;

  @IsString({ message: 'MRN must be a string' })
  @MaxLength(10)
  @IsNotEmpty({ message: 'MRN is Required' })
  password: string;

  @IsString({ message: 'Mobile must be a string' })
  @IsNotEmpty({ message: 'Mobile is Required' })
  mobile: string;
}
