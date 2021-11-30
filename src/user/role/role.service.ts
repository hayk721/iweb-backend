import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { UniqueConstraintError, ValidationError } from 'sequelize';
import { Sequelize } from 'sequelize-typescript';
import { InjectModel } from '@nestjs/sequelize';
import { CreateRoleDto } from './dto/create-role.dto';
import { Role } from './models/role.model';
import { EditRoleDto } from './dto/edit-role.dto';

@Injectable()
export class RoleService {
  constructor(
    private readonly _sequelize: Sequelize,
    @InjectModel(Role)
    private readonly _role: typeof Role,
  ) {}

  /**
   * create new role
   * @param createRoleDto
   */
  async create(createRoleDto: CreateRoleDto): Promise<Role> {
    return await this._role.create<Role>(createRoleDto);
  }

  /**
   * get all roles raw
   */
  async findAll(): Promise<Role[]> {
    return await this._role.findAll<Role>();
  }

  /**
   * get single role
   * @param $id
   */
  async findOne($id: string): Promise<Role> {
    try {
      return await this._role.findOne<Role>({ where: { id: $id } });
    } catch (err) {
      throw new NotFoundException('role not found');
    }
  }

  /**
   * get single role
   * @param $name
   */
  async findByName($name: string): Promise<Role> {
    try {
      return await this._role.findOne<Role>({ where: { name: $name } });
    } catch (err) {
      new HttpException('role not found', HttpStatus.NOT_FOUND);
    }
  }

  /**
   * update role raw
   * @param $id
   * @param editRoleDto
   */
  async update($id: string, editRoleDto: EditRoleDto): Promise<any | HttpException> {
    try {
      await this._role.update<Role>(editRoleDto, { where: { id: $id } });
      return this._role.findOne<Role>({ where: { id: $id } });
    } catch (err) {
      if (err instanceof ValidationError || err instanceof UniqueConstraintError) throw err;
      return new HttpException('Error while Updating', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  /**
   * remove from db
   * @param $id
   */
  async remove($id: string): Promise<number | HttpException> {
    try {
      return await this._role.destroy({ where: { id: $id } });
    } catch (err) {
      throw new HttpException('Unable To Delete', HttpStatus.BAD_REQUEST);
    }
  }
}
