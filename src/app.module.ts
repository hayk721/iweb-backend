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
import { DATABASE_CONFIG } from '@common/database/config/database.provider';
import { ConfigModule } from '@nestjs/config';
import { JwtAuthGuard } from '@common/guards/jwt-auth.guard';
import { RolesGuard } from '@common/guards/role.guard';
import { APP_GUARD } from '@nestjs/core';
import { RoleModule } from './user/role/role.module';

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
    RoleModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule {}
