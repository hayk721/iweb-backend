import { BadRequestException, Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { CurrentUser } from '@currentUser';
import { UserModel } from './user/models/user.model';
import { AddTokenDto } from './firebase/dto/notification-data.dto';
//import { FcmNotification } from './firebase/models/fcm-notifications.model';
//import { Op } from 'sequelize';
@Controller()
export class AppController {
  constructor(private readonly _appService: AppService) {}

  @Get()
  async getHello() {
    return this._appService.getHello();
  }
  @Post()
  async storeFcmToken(@CurrentUser() user: UserModel, @Body() { token }: AddTokenDto) {
    // try {
    //   const tokenPart = token.split(':')[1];
    //   await FcmNotification.destroy({ where: { token: { [Op.like]: `%:${tokenPart}`, [Op.ne]: token } } });
    //   return await user.$create<any>('notification', { token });
    // } catch (e) {
    //   throw new BadRequestException('duplicate token');
    // }
  }
}
