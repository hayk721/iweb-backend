import { IsOptional, IsString, Length, IsEnum, IsDateString } from 'class-validator';
import { LANG } from '@enums/user-lang.enum';
import { GENDER } from "@enums/gender.enum";

export class EditUserDto {
  @IsOptional()
  @IsString({ message: 'name must be a string' })
  @Length(3)
  name: string;

  @IsOptional()
  @IsString({ message: 'surname Name must be a string' })
  @Length(3)
  surname: string;

  @IsOptional()
  @IsString({ message: 'nameAr must be a string' })
  @Length(3)
  nameAr: string;

  @IsOptional()
  @IsString({ message: 'surnameAr must be a string' })
  @Length(3)
  surnameAr: string;

  @IsOptional()
  @IsEnum(Object.values(GENDER))
  gender: GENDER;

  @IsOptional()
  @IsDateString()
  birthdate: Date;

  @IsOptional()
  @IsEnum(Object.values(LANG))
  locale: LANG;
}
