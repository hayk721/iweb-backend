import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { User } from './models/user.model';
import { Role } from './role/models/role.model';
import { UserManagementService } from './user-managment/user-management.service';
import { FirebaseModule } from '../firebase/fitrebase.module';

@Module({
  imports: [SequelizeModule.forFeature([User, Role]), FirebaseModule],
  controllers: [UserController],
  providers: [UserService, UserManagementService],
  exports: [UserService],
})
export class UserModule {}
