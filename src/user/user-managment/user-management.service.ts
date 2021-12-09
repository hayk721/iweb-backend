import { BadRequestException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Sequelize } from 'sequelize-typescript';
import { InjectModel } from '@nestjs/sequelize';
import { FirebaseAdmin } from '../../firebase/firebase-admin';
import { User } from '../models/user.model';
import { Role } from '../role/models/role.model';
import { EditUserDto, CreateUserDto } from './user-management.dto';

@Injectable()
export class UserManagementService {
  constructor(
    private readonly _sequelize: Sequelize,
    @InjectModel(User)
    private readonly _user: typeof User,
    @Inject(FirebaseAdmin) private readonly _firebaseAdmin: FirebaseAdmin,
  ) {}

  /**
   * get all users
   */
  async findAll(): Promise<User[]> {
    return await this._user.findAll<User>({
      include: [
        {
          model: Role,
        },
      ],
    });
  }

  /**
   * get user by id
   * @param $id
   */
  async findOne($id: string): Promise<User> {
    const user = await this._user.findByPk<User>($id);
    if (!user) throw new NotFoundException('user not found');
    return user;
  }

  /**
   * create new user
   * @param createUserDto
   * @param file
   */
  async create(createUserDto: CreateUserDto, file?: Express.Multer.File) {
    const transaction = await this._sequelize.transaction();
    try {
      const user = await this._user.create<User>(createUserDto, { transaction });
      await user.$set('subscriptions', createUserDto.subscriptions, { transaction });
      if (file.size) {
        const path = `userAvatars/${user.id}`;
        const avatar = await this._firebaseAdmin.storeFile(path, file.buffer, file.mimetype);
        await user.update({ avatar }, { transaction });
      }
      await transaction.commit();
      return user;
    } catch (e) {
      await transaction.rollback();
      throw e;
    }
  }

  /**
   * update user
   * @param $id
   * @param editUserDto
   * @param file
   */
  async update($id: string, editUserDto: EditUserDto, file?: Express.Multer.File): Promise<User> {
    const transaction = await this._sequelize.transaction();
    try {
      const user: User = await this.findOne($id);
      let avatar;
      if (file.size) {
        const path = `userAvatars/${user.id}`;
        avatar = await this._firebaseAdmin.storeFile(path, file.buffer, file.mimetype);
        await user.update({ avatar }, { transaction });
        await user.$set('subscriptions', editUserDto.subscriptions, { transaction });
      }
      await user.update({ ...editUserDto, avatar });
      await transaction.commit();
      return user;
    } catch (e) {
      await transaction.rollback();
      throw new NotFoundException('Product not found' + e.message);
    }
  }

  /**
   * delete user
   * @param $id
   */
  async remove($id: string) {
    const user: User = await this.findOne($id);
    try {
      return await user.destroy();
    } catch (err) {
      throw new BadRequestException('Unable To Delete');
    }
  }
}
