import { Controller, Get, Post, Body, Param, Delete, HttpException, HttpStatus, Patch } from '@nestjs/common';
import { RoleService } from './role.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { EditRoleDto } from './dto/edit-role.dto';
import { CreateRoleDto } from './dto/create-role.dto';

@ApiTags('role')
@ApiBearerAuth()
@Controller('role')
export class RoleController {
  constructor(private readonly _roleService: RoleService) {}

  /**
   * create role
   * @param createRoleDto
   */
  @Post()
  async create(@Body() createRoleDto: CreateRoleDto) {
    return this._roleService.create(createRoleDto);
  }

  /**
   * get all roles
   */
  @Get()
  async findAll() {
    return this._roleService.findAll();
  }

  /**
   * get single role by id
   * @param id
   */
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this._roleService.findOne(id);
  }
  /**
   * update role by id
   * @param id
   * @param updateRoleDto
   */
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateRoleDto: EditRoleDto) {
    return this._roleService.update(id, updateRoleDto);
  }

  /**
   * delete role by id
   * @param id
   */
  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      return this._roleService.remove(id);
    } catch (err) {
      throw new HttpException('Unable To Delete', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
