import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ScheduleModule } from '@nestjs/schedule';
import { SequelizeModule } from '@nestjs/sequelize';
import { AuthModule } from './auth/auth.module';
import { TasksModule } from './task/task.module';
import { HeaderResolver, I18nModule } from 'nestjs-i18n';
import { I18nObjectParser } from '@common/i18n/parser/i18nObjectParser';
import { BullModule } from '@nestjs/bull';
import { UserModule } from './user/user.module';
import { DATABASE_CONFIG } from '@common/database/config/database.provider';
import { ConfigModule } from '@nestjs/config';
import { FirebaseModule } from './firebase/fitrebase.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }), // load .env
    SequelizeModule.forRoot({ ...DATABASE_CONFIG(), autoLoadModels: true, synchronize: false }),
    ScheduleModule.forRoot(),
    BullModule.forRoot({
      redis: {
        host: process.env.REDIS_HOST,
      },
    }),
    I18nModule.forRoot({
      fallbackLanguage: 'en',
      parser: I18nObjectParser,
      parserOptions: {
        watch: true,
      },
      resolvers: [new HeaderResolver(['x-locale'])],
    }),
    AuthModule,
    TasksModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
