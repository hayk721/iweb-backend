import {
  AfterCreate,
  AfterSave,
  BeforeCreate,
  BelongsTo,
  BelongsToMany,
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
import { Role } from '../role/models/role.model';
import { FcmNotification } from '../../firebase/models/fcm-notifications.model';
import { Subscription } from "../../chat-api/models/subscription.model";
import { UsersSubscriptions } from "../../chat-api/models/users-subscriptions-pivot.model";

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

  @Column({ type: DataType.STRING, allowNull: false })
  password: string;

  @Column({ type: DataType.STRING, allowNull: true })
  display_name: string;

  @Column({ type: DataType.STRING(15), allowNull: true, unique: true })
  phone: string;

  @Column({ type: DataType.TEXT, allowNull: true })
  avatar: string;

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

  @BelongsToMany(() => Subscription, () => UsersSubscriptions)
  subscriptions: Subscription[];
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
