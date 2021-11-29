import { Injectable, HttpException, HttpStatus, BadRequestException, NotFoundException } from "@nestjs/common";
import { ValidationError, UniqueConstraintError, Transaction } from 'sequelize';
import { hashSync, genSaltSync } from 'bcrypt';
import { Sequelize } from 'sequelize-typescript';
import { InjectModel } from '@nestjs/sequelize';
import { UserModel } from './models/user.model';
import { UserEntity } from './user.entity';
import { USER_TYPES } from '@common/enums/user-types';
import { IJwtPayload } from '@interfaces/auth/IJwtPayload';
import { EditUserDto } from "./dto/update-user.dto";

@Injectable()
export class UserService {
  constructor(
    private readonly _sequelize: Sequelize,
    @InjectModel(UserModel)
    private readonly _user: typeof UserModel,
  ) {}

  /**
   * @description Create New User
   */
  public async createNewUser(user: any): Promise<UserModel> {
    return this._sequelize
      .transaction<UserModel>(async (trans: Transaction) => {
        return this._user.create<UserModel>({ password: 'u2dege345ghf6', ...user }, { transaction: trans });
      })
      .catch((err) => {
        if (err instanceof ValidationError || err instanceof UniqueConstraintError) {
          if (err.errors.length > 0) {
            throw new BadRequestException(
              err.errors.map((e) => {
                return e.message;
              }),
            );
          }
          throw err;
        } else throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR);
      });
  }

  public async changeProfilePic(url: string, id: string) {
    await this._user.update<UserModel>({ profilePic: url }, { where: { id: id } });
  }

  /**
   * @description Update User Password
   * @param user
   * @param password
   */
  public async changePassword(user: UserEntity, password: string): Promise<void> {
    const salt = genSaltSync(12);
    const hashedPassword = hashSync(password, salt);
    return this._sequelize
      .transaction(async (trans) => {
        await this._user.update<UserModel>(
          {
            password: hashedPassword,
            lastLogOutDate: new Date(),
          },
          {
            where: {
              id: user.id,
              isSuspend: false,
            },
            transaction: trans,
          },
        );
      })
      .catch((err) => {
        if (err instanceof ValidationError || err instanceof UniqueConstraintError) throw err;
        else throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
      });
  }

  /**
   * update last Login Date
   */
  public async updateLoginDate(user: UserModel) {
    return this._sequelize
      .transaction(async (trans) => {
        await this._user.update<UserModel>(
          {
            lastLoginDate: new Date(),
            isLoggedOut: false,
          },
          {
            where: {
              id: user.id,
              //isEmailVerified: true,
              isSuspend: false,
            },
            transaction: trans,
          },
        );
      })
      .catch((err) => {
        if (err instanceof ValidationError || err instanceof UniqueConstraintError) throw err;
        else throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
      });
  }

  /**
   * update logoutDate
   */
  public async setAsLoggedOut(user: UserEntity): Promise<boolean> {
    return this._sequelize
      .transaction(async (trans) => {
        await this._user.update<UserModel>(
          {
            lastLogOutDate: new Date(),
            isLoggedOut: true,
          },
          {
            where: {
              id: user.id,
            },
            transaction: trans,
          },
        );
        return true;
      })
      .catch((err) => {
        return false;
      });
  }
  /**
   * @description Get User Data By His Email Address
   * @param udhId
   */
  public async getUserByUdhId(udhId: string): Promise<UserModel | null> {
    try {
      return await this._user.findOne({ where: { udhId: udhId } });
    } catch (err) {
      console.log(err);
      return null;
    }
  }
  /**
   * @description Get User Data By His Email Address
   * @param $mrn
   */
  public async getUserByMRN($mrn: string): Promise<UserModel | null> {
    try {
      return await this._user.findOne({
        where: {
          mrn: $mrn,
          userType: USER_TYPES.Patient,
        },
        attributes: ['id', 'email', 'password', 'isSuspend', 'mrn'],
      });
    } catch (err) {
      console.log(err);
      return null;
    }
  }

  /**
   * @description Get User Data By Id
   * @param id
   */
  public async getUserById(id: string): Promise<UserModel> {
    return this._user.findByPk<UserModel>(id);
  }

  /**
   * @description Check User Data By His JWT Decoded Data
   * @param payload
   */
  public async validateUser(payload: IJwtPayload): Promise<UserEntity> {
    return await this._user.findByPk<UserModel>(payload.id);
  }
  /* /!**
   * @description update passcode
   * @param passcode
   *!/
  public async setPasscode(passcode:string) {
    return this._sequelize.transaction(async trans => {
      await this._user.update(
        { isMobileVerified: true , passcode},
        {
          where: { id: user.id },
          transaction: trans,
        },
      );
    });
  }*/
  /**
   * @description Set user's mobile number  as verified
   * @param user
   */
  public async setMobileNumberAsVerified(user: UserEntity) {
    return this._sequelize.transaction(async (trans) => {
      await this._user.update(
        { isMobileVerified: true },
        {
          where: { id: user.id },
          transaction: trans,
        },
      );
    });
  }

  public async updateNewUserFlag($user: UserEntity) {
    try {
      console.log('[UPDATING_NEW_USER_FLAG]');
      await this._user.update({ isNew: false }, { where: { id: $user.id } });
      return;
    } catch (err) {
      console.log(err);
      return;
    }
  }

  /**
   * update user
   * @param id
   * @param editUserDto
   */
  async update(id: string, editUserDto: EditUserDto): Promise<UserModel> {
    const user: UserModel = await this.getUserById(id);
    if (!user) throw new NotFoundException('User not found');
    return await user.update(editUserDto);
  }

  /**
   * @description get patients count
   */
  public async getUserCount(): Promise<number> {
    return await this._user.count();
  }
}
