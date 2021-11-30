import {
  AfterCreate,
  AfterSave,
  BeforeCreate,
  BelongsTo,
  Column,
  DataType,
  DefaultScope,
  ForeignKey,
  HasMany,
  IsUUID,
  Model,
  Scopes,
  Table,
} from 'sequelize-typescript';
import { tableOptions } from '@common/database/config/table-options';
import { genSaltSync, hashSync } from 'bcrypt';
import { LANG } from '@enums/user-lang.enum';
import { Role } from '../role/models/role.model';
import { FcmNotification } from '../../firebase/models/fcm-notifications.model';

/**
 *
 */
tableOptions.tableName = 'user';

@DefaultScope({
  attributes: { exclude: ['password'] },
})
@Scopes(() => ({
  withoutPassword: {
    attributes: { exclude: ['password'] },
  },
}))
@Table(tableOptions)
export class User extends Model {
  @IsUUID('4')
  @Column({
    type: DataType.STRING(36),
    allowNull: false,
    primaryKey: true,
    defaultValue: DataType.UUIDV4,
  })
  public id: string;

  @Column({ validate: { isEmail: true }, type: DataType.STRING, allowNull: false, unique: true })
  email: string;

  @Column({ type: DataType.TEXT, allowNull: false })
  password: string;

  @Column({ type: DataType.STRING, allowNull: true })
  firstName: string;

  @Column({ type: DataType.STRING, allowNull: true })
  lastName: string;

  @Column({ type: DataType.STRING(15), allowNull: true, unique: true })
  mobileNumber: string;

  @Column({ type: DataType.BOOLEAN, allowNull: true, defaultValue: false })
  isEmailVerified: boolean;

  @Column({ type: DataType.BOOLEAN, allowNull: true, defaultValue: false })
  isMobileVerified: boolean;

  @Column({ type: DataType.BOOLEAN, allowNull: true, defaultValue: false })
  isSuspend: boolean;

  @Column({ type: DataType.DATE, allowNull: true })
  lastLoginDate: Date;

  @Column({ type: DataType.DATE, allowNull: true })
  lastLogOutDate: Date;

  @Column({ type: DataType.TEXT, allowNull: true })
  avatar: string;

  @Column({ type: DataType.BOOLEAN, allowNull: true, defaultValue: true })
  isNew: boolean;

  @Column({ type: DataType.ENUM({ values: Object.keys(LANG) }), allowNull: true, defaultValue: LANG.AR })
  lang: LANG;
  /**
   * Relations
   */
  @HasMany(() => FcmNotification)
  notifications: FcmNotification[];

  @BelongsTo(() => Role, { foreignKey: 'roleId' })
  role: Role;
  @ForeignKey(() => Role)
  @Column({ type: DataType.STRING(36) })
  roleId: string;

  /**
   * @description Hooks
   * @param user
   * @param options
   */
  @BeforeCreate
  public static async hashPassword(user: User, options: any) {
    if (!options.transaction) {
      throw new Error('Missing transaction.');
    }
    const salt = genSaltSync(12);
    user.password = hashSync(user.password, salt);
    if (!user.roleId) {
      const role = await Role.findOne<Role>({ where: { name: 'Patient' } });
      user.roleId = role?.id;
    }
  }

  @AfterSave
  @AfterCreate
  static removePassword(user: any) {
    if (user.length === undefined) user.password = undefined;
    else user.forEach((_user: User) => (_user.password = undefined));
    return user;
  }
}
