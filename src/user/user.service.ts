import { Injectable } from '@nestjs/common';
import { Op } from 'sequelize';
import { IEmailVerification } from '@common/interfaces/auth/IEmailVerification';
import { hashSync, genSaltSync } from 'bcrypt';
import { Sequelize } from 'sequelize-typescript';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './models/user.model';
import { Role } from './role/models/role.model';
import { FcmNotification } from '../firebase/models/fcm-notifications.model';
import { ChangeUserRoleDto } from './user-managment/user-management.dto';
import { CreateUserDto } from '../auth/auth.dto';

@Injectable()
export class UserService {
  constructor(
    private readonly _sequelize: Sequelize,
    @InjectModel(User)
    private readonly _user: typeof User,
  ) {}

  /**
   * @description Create New User
   */
  public async createNewUser($user: CreateUserDto): Promise<User> {
    const transaction = await this._sequelize.transaction();
    try {
      const user = await this._user.create<User>($user, { transaction });
      await transaction.commit();
      return user;
    } catch (e) {
      await transaction.rollback();
      console.error(e.message, e.name );
    }
  }

  public async changeProfilePic(url: string, id: string) {
    await this._user.update<User>({ profilePic: url }, { where: { id: id } });
  }

  /**
   * @description Update User Password
   */
  public async changePassword($user: User, $password: string) {
    const salt = genSaltSync(12);
    const hashedPassword = hashSync($password, salt);
    const transaction = await this._sequelize.transaction();
    try {
      const user = await User.update<User>(
        {
          password: hashedPassword,
          lastLogOutDate: new Date(),
          isLoggedOut: true,
        },
        {
          where: {
            id: $user.id,
          },
          transaction,
        },
      );
      await transaction.commit();
      return user;
    } catch (e) {
      await transaction.rollback();
      throw e;
    }
  }

  /**
   * update last Login Date
   */
  public async updateLoginDate($user: User) {
    const transaction = await this._sequelize.transaction();
    try {
      const user = await User.update<User>(
        {
          lastLoginDate: new Date(),
          isLoggedOut: false,
        },
        {
          where: {
            id: $user.id,
            isEmailVerified: true,
          },
          transaction,
        },
      );
      await transaction.commit();
      return user;
    } catch (e) {
      await transaction.rollback();
      throw e;
    }
  }

  /**
   * update logoutDate
   */
  public async setAsLoggedOut($user: User) {
    const transaction = await this._sequelize.transaction();
    try {
      const user = await User.update<User>(
        {
          lastLogOutDate: new Date(),
          isLoggedOut: true,
        },
        {
          where: {
            id: $user.id,
          },
          transaction,
        },
      );
      await transaction.commit();
      return user;
    } catch (e) {
      await transaction.rollback();
      throw e;
    }
  }

  /**
   * @description Get User Data By His Email Address
   * @param $email
   */
  public async getUserByEmail($email: string): Promise<User> {
    try {
      return await User.findOne({
        where: {
          email: $email,
        },
        attributes: ['id', 'email', 'password', 'display_name', 'avatar', 'phone'],
        include: [{ model: Role, attributes: ['name'] }],
      });
    } catch (err) {
      console.log(err);
      return null;
    }
  }

  /**
   * @description Get User fcm tokens by role
   * @param roleNames
   * @param excludeUsers: string[] - exclude some users
   */
  public async getUserByRole(roleNames: string[], excludeUsers: string[] = []): Promise<User[]> {
    try {
      return await this._user.findAll({
        where: {
          id: { [Op.notIn]: excludeUsers },
        },
        include: [
          {
            model: Role,
            where: {
              name: roleNames,
            },
            attributes: [],
          },
          {
            model: FcmNotification,
            attributes: ['token'],
          },
        ],
      });
    } catch (err) {
      console.log(err);
      return [];
    }
  }

  /**
   * @description Get User Data By His Email Address
   * @param $id
   * @param withModels
   */
  public async getUserById($id: string, withModels: string[] = []): Promise<User> {
    return await User.findByPk<User>($id, {
      include: withModels,
      attributes: ['id', 'email', 'password', 'display_name', 'avatar', 'phone'],
    });
  }

  /**
   * @description Check User Data By His JWT Decoded Data
   * @param $id
   */
  public async validateUser($id: string): Promise<User> {
    const user = await User.findByPk<User>($id, {
      attributes: { exclude: ['password'] },
      include: Role,
    });
    if (user) {
      return user;
    } else {
      return null;
    }
  }

  /********************************* Activation Services ********************************/
  /**
   * @description Set user email as active
   * @param emailVerification
   */
  public async verifyEmail(emailVerification: IEmailVerification) {
    return await this._sequelize.transaction(async (trans) => {
      await User.update(
        { isEmailVerified: true },
        {
          where: { id: emailVerification.userId, email: emailVerification.email },
          transaction: trans,
        },
      );
    });
  }

  /**
   * @description Set user's mobile number  as verified
   * @param user
   */
  public async setMobileNumberAsVerified(user: User) {
    return await this._sequelize.transaction(async (trans) => {
      await User.update(
        { isMobileVerified: true },
        {
          where: { id: user.id },
          transaction: trans,
        },
      );
    });
  }

  public async updateNewUserFlag($user: User) {
    try {
      await this._user.update({ isNew: false }, { where: { id: $user.id } });
      return;
    } catch (err) {
      console.log(err);
      return;
    }
  }

  async changeUserRole(changeUserRoleDto: ChangeUserRoleDto) {
    try {
      const role = await Role.findOne({
        where: {
          name: changeUserRoleDto.role,
        },
      });

      return await this._user.update(
        {
          roleId: role.id,
        },
        {
          where: {
            id: changeUserRoleDto.userId,
          },
        },
      );
    } catch (err) {
      console.log(err);
      return;
    }
  }

  async changeUserPassword(id: string, password: string) {
    const salt = genSaltSync(12);
    const hashedPassword = hashSync(password, salt);
    return await this._user.update(
      {
        password: hashedPassword,
      },
      {
        where: {
          id,
        },
      },
    );
  }
}
