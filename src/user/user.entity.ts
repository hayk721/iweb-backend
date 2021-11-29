import { USER_TYPES_NO } from '@enums/user-types';

export interface UserEntity {
  id?: string;

  email: string;

  name: string;

  surname: string;

  nameAr: string;

  surnameAr: string;

  gender: 'Male' | 'Female';

  birthdate: Date;

  password: string;

  mobile: string;

  userType: USER_TYPES_NO;

  isMobileVerified: boolean;

  isLoggedOut: boolean;

  isSuspend: boolean;

  lastLoginDate: Date;

  lastLogOutDate: Date;

  locale: 'en' | 'ar';
}
