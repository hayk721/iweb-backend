import { CurrentUser } from '@common/decorators/current-user.decorator';
import { Controller, Get, Post, Body, Param, Put, Delete, Patch, UseInterceptors, UploadedFile } from '@nestjs/common';
import { UserService } from './user.service';
import { MessageCodeError } from '@common/errors/message-code-error';
import { ApiTags, ApiBearerAuth, ApiConsumes } from '@nestjs/swagger';
import { UserManagementService } from './user-managment/user-management.service';
import { ChangeUserPasswordDto, ChangeUserRoleDto, EditUserDto, ChangePasswordDto, CreateUserDto } from './user-managment/user-management.dto';
import { User } from './models/user.model';
import { FastifyFileInterceptor } from '@common/interceptors/fastify-file.interceptor';
import { imageFileFilter } from '@utils/utils';
import { ROLES } from '@enums/user-types';
import { Roles } from '@userRoles';

/**
 *
 */
@ApiTags('user')
@ApiBearerAuth()
@Controller('user')
export class UserController {
  constructor(private readonly _user: UserService, private readonly _userManagementService: UserManagementService) {}

  /**
   * Get user Information
   */
  @Get('profile')
  async getUser(@CurrentUser() user: User): Promise<User> {
    return this._user.getUserById(user.id);
  }
  /**
   * get all users
   */
  @Roles(ROLES.ADMIN)
  @Get()
  async findAll() {
    return this._userManagementService.findAll();
  }
  /**
   * get user by id
   * @param id
   */
  @Roles(ROLES.ADMIN)
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this._userManagementService.findOne(id);
  }
  /**
   * create new user
   * @param createUserDto
   * @param file
   */
  @Roles(ROLES.ADMIN)
  @Post()
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FastifyFileInterceptor('avatar', { fileFilter: imageFileFilter }))
  async create(@Body() createUserDto: CreateUserDto, @UploadedFile() file: Express.Multer.File) {
    return this._userManagementService.create(createUserDto, file);
  }
  /**
   * update user by id
   * @param id
   * @param updateUserDto
   * @param file
   */
  @Roles(ROLES.ADMIN)
  @Put(':id')
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FastifyFileInterceptor('avatar', { fileFilter: imageFileFilter }))
  async update(@Param('id') id: string, @Body() updateUserDto: EditUserDto, @UploadedFile() file: Express.Multer.File) {
    return this._userManagementService.update(id, updateUserDto, file);
  }
  /**
   * update user by id
   * @param user
   * @param updateUserDto
   * @param file
   */
  @Put('current')
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FastifyFileInterceptor('avatar', { fileFilter: imageFileFilter }))
  async updateCurrent(@CurrentUser() user: User, @Body() updateUserDto: EditUserDto, @UploadedFile() file: Express.Multer.File) {
    return this._userManagementService.update(user.id, updateUserDto, file);
  }
  /**
   * delete user by id
   * @param id
   */
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this._userManagementService.remove(id);
  }
  /**
   * @description Change current user password
   *
   * @param user
   * @param changePasswordRequest
   */
  @Put('change-password')
  public async changePassword(@CurrentUser() user: User, @Body() changePasswordRequest: ChangePasswordDto) {
    if (!user) {
      throw new MessageCodeError('auth:logout:notLoggedIn');
    }
    try {
      return await this._user.changePassword(user, changePasswordRequest.password);
    } catch (error) {
      throw error;
    }
  }

  /**
   * @description Change User Role
   */
  @Roles(ROLES.ADMIN)
  @Patch('change-role')
  async changeRole(@Body() changeUserRoleDto: ChangeUserRoleDto) {
    return await this._user.changeUserRole(changeUserRoleDto);
  }

  /**
   * @description Change user password by user id
   *
   * @param id
   * @param body
   */
  @Roles(ROLES.ADMIN)
  @Put('/change-password/:id')
  async changePasswordUser(@Param('id') id: string, @Body() body: ChangeUserPasswordDto) {
    return await this._user.changeUserPassword(id, body.password);
  }
}
