import { CurrentUser } from '@common/decorators/current-user.decorator';
import { Controller, Get, HttpException, HttpStatus, Post, Body, Param, Put, Delete, Patch, UseInterceptors, UploadedFile } from '@nestjs/common';
import { UserService } from './user.service';
import { MessageCodeError } from '@common/errors/message-code-error';
import { ApiTags, ApiBearerAuth, ApiConsumes } from '@nestjs/swagger';
import { UserManagementService } from './user-managment/user-management.service';
import { ChangeUserPasswordDto, ChangeUserRoleDto, EditUserDto } from './user-managment/user-management.dto';
import { ChangePasswordDto, CreateUserDto } from '../auth/auth.dto';
import { User } from './models/user.model';
import { FastifyFileInterceptor } from '@common/interceptors/fastify-file.interceptor';
import { imageFileFilter } from '@utils/utils';

/**
 *
 */
@ApiTags('user')
@ApiBearerAuth()
@Controller('user')
export class UserController {
  constructor(private readonly _user: UserService, private readonly _userManagementService: UserManagementService) {}

  /**
   * Get user Informantion
   */
  @Get('profile')
  async getUser(@CurrentUser() user: User): Promise<User | HttpException | any> {
    if (!user || !user.id) {
      return new HttpException('User not Found', HttpStatus.NOT_FOUND);
    }
    return this._user.getUserById(user.id);
  }
  /**
   * get all users
   */
  @Get()
  async findAll() {
    return this._userManagementService.findAll();
  }
  /**
   * get user by id
   * @param id
   */
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this._userManagementService.findOne(id);
  }
  /**
   * create new user
   * @param createUserDto
   * @param file
   */
  @Post()
  @ApiBearerAuth('jwt-token')
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FastifyFileInterceptor('file', { fileFilter: imageFileFilter }))
  async create(@Body() createUserDto: CreateUserDto, @UploadedFile() file: Express.Multer.File) {
    return this._userManagementService.create(createUserDto, file);
  }
  /**
   * update user by id
   * @param id
   * @param updateUserDto
   * @param file
   */
  @Put(':id')
  @ApiBearerAuth('jwt-token')
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FastifyFileInterceptor('file', { fileFilter: imageFileFilter }))
  async update(@Param('id') id: string, @Body() updateUserDto: EditUserDto, @UploadedFile() file: Express.Multer.File) {
    return this._userManagementService.update(id, updateUserDto, file);
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
   * changePassword
   */
  @Put('change-password')
  @ApiBearerAuth('jwt-token')
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
  @Patch('change-role')
  async changeRole(@Body() changeUserRoleDto: ChangeUserRoleDto) {
    return await this._user.changeUserRole(changeUserRoleDto);
  }

  @Put('/change-password/:id')
  async changePasswordUser(@Param('id') id: string, @Body() body: ChangeUserPasswordDto) {
    return await this._user.changeUserPassword(id, body.password);
  }
}
