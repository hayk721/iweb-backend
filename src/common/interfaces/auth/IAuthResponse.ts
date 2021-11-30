import { User } from '../../../user/models/user.model';

export interface IAuthResponse {
  authorized: boolean;
  access_token: string;
  user?: User;
}
