import { UserEntity } from '../../../user/user.entity';

export interface IAuthResponse {
  authorized: boolean;
  access_token: string;
  user?: UserEntity;
}
