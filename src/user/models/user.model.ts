import { BeforeCreate, Column, DataType, HasMany, IsUUID, Model, Scopes, Table } from 'sequelize-typescript';
import { genSaltSync, hashSync } from 'bcrypt';
import { USER_TYPES_NO } from '@enums/user-types';
import { tableOptions } from '@common/database/config/table-options';
import { UserEntity } from '../user.entity';
import { FcmNotification } from '../../firebase/models/fcm-notifications.model';

/**
 *
 */
tableOptions.tableName = 'user';

/*@DefaultScope({
  attributes: { exclude: ['password'] }
})*/
@Scopes(() => ({
  withoutPassword: {
    attributes: { exclude: ['password'] },
  },
}))
@Table(tableOptions)
export class UserModel extends Model {
  @IsUUID('4')
  @Column({
    type: DataType.UUID,
    allowNull: false,
    primaryKey: true,
    defaultValue: DataType.UUIDV4,
    unique: true,
  })
  public id: string;

  @Column({ validate: { isEmail: true }, type: DataType.STRING, unique: true })
  email: string;

  @Column({ type: DataType.STRING(60), allowNull: true })
  name: string;

  @Column({ type: DataType.STRING(20), allowNull: true })
  surname: string;

  @Column({ type: DataType.STRING(60), allowNull: true })
  nameAr: string;

  @Column({ type: DataType.STRING(20), allowNull: true })
  surnameAr: string;

  @Column({ type: DataType.STRING(6), allowNull: true })
  gender: 'Male' | 'Female';

  @Column({ type: DataType.DATE, allowNull: true })
  birthdate: Date;

  @Column({ type: DataType.TEXT, allowNull: false })
  password: string;

  @Column({ type: DataType.STRING(15), allowNull: true, unique: true })
  mobile: string;

  @Column({ type: DataType.SMALLINT({ length: 1 }), allowNull: true, defaultValue: USER_TYPES_NO.Patient })
  userType: USER_TYPES_NO;

  @Column({ type: DataType.BOOLEAN, allowNull: true, defaultValue: false })
  isMobileVerified: boolean;

  @Column({ type: DataType.BOOLEAN, allowNull: true, defaultValue: true })
  isLoggedOut: boolean;

  @Column({ type: DataType.BOOLEAN, allowNull: true, defaultValue: false })
  isSuspend: boolean;

  @Column({ type: DataType.ENUM('en', 'ar'), allowNull: true })
  locale: 'en' | 'ar';

  @Column({ type: DataType.DATE, allowNull: true })
  lastLoginDate: Date;

  @Column({ type: DataType.DATE, allowNull: true })
  lastLogOutDate: Date;

 /* @HasMany(() => FcmNotification)
  notifications: FcmNotification[];*/

  /**
   * @description Hooks
   * @param user
   * @param options
   */
  @BeforeCreate
  public static async hashPassword(user: UserEntity, options: any) {
    if (!options.transaction) {
      throw new Error('Missing transaction.');
    }
    const salt = genSaltSync(12);
    user.password = hashSync(user.password, salt);
  }
}
