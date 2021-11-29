import { IsString, Matches } from 'class-validator';

export class NotificationDataDto {

  @IsString({ message: 'title must be a string' })
  title: string;

  @IsString({ message: 'body must be a string' })
  body: string;

}
export class AddTokenDto {
  @IsString({ message: 'token must be a string' })
  @Matches(/^\S{22}:\S{140}$/, { message: 'Not valid token' })
  token: string;
}
