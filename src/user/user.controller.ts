import { Body, Controller, Param, Put } from '@nestjs/common';
import { EditUserDto } from './dto/update-user.dto';
import { UserService } from './user.service';
import { ApiTags } from '@nestjs/swagger';
import { ISuccessResponse } from '@interfaces/response/ISuccessResponse';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly _userService: UserService) {}
  /**
   * update user by id
   * @param id
   * @param updateUserDto
   */
  @Put(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: EditUserDto): Promise<ISuccessResponse> {
    await this._userService.update(id, updateUserDto);
    return { statusCode: 200, message: 'operation completed successfully' };
  }
}
