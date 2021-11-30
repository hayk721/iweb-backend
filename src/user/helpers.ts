import { User } from './models/user.model';
import { IJwtPayload } from '@interfaces/auth/IJwtPayload';

/**
 * check if user is Admin
 * @param user
 */
export function isAdmin(user: User | IJwtPayload): boolean {
  return (user as IJwtPayload).role === 'Admin' || (user as User)?.role?.name === 'Admin';
}

export function isOperation(user: User | IJwtPayload): boolean {
  return (user as IJwtPayload).role === 'Operation' || (user as User)?.role?.name === 'Operation';
}

export function isAccountant(user: User | IJwtPayload): boolean {
  return (user as IJwtPayload).role === 'Accountant' || (user as User)?.role?.name === 'Accountant';
}

export function isPatient(user: User | IJwtPayload): boolean {
  return (user as IJwtPayload).role === 'Patient' || (user as User)?.role?.name === 'Patient';
}
