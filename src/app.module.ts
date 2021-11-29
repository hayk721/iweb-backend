import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ScheduleModule } from '@nestjs/schedule';
import { DATABASE_CONFIG } from '@common/database/config/database.provider';
import { SequelizeModule } from '@nestjs/sequelize';
import { AuthModule } from './auth/auth.module';
import { TasksModule } from './task/task.module';
import { HeaderResolver, I18nModule } from 'nestjs-i18n';
import { I18nObjectParser } from '@common/i18n/parser/i18nObjectParser';

@Module({
  imports: [
    SequelizeModule.forRoot({ ...DATABASE_CONFIG(), autoLoadModels: true, synchronize: false }),
    ScheduleModule.forRoot(),
    AuthModule,
    TasksModule,
    I18nModule.forRoot({
      fallbackLanguage: 'en',
      parser: I18nObjectParser,
      parserOptions: {
        watch: true,
      },
      resolvers: [new HeaderResolver(['x-locale'])],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
