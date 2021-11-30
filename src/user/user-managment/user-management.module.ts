import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from '../models/user.model';
import { UserManagementService } from './user-management.service';

@Module({
  imports: [SequelizeModule.forFeature([User])],
  providers: [UserManagementService],
})
export class UserManagementModule {}
