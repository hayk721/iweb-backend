export interface IPasswordReset {
  id?: string;
  email: string;
  token: string;
  createdAt?: Date;
}
