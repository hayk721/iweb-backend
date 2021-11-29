import { databaseConfig } from './database.config';
import { SequelizeModuleOptions } from '@nestjs/sequelize';

export const DATABASE_CONFIG = (): SequelizeModuleOptions => {
  let config: SequelizeModuleOptions;
  switch (process.env.NODE_ENV) {
    case 'production':
    case 'prod':
      config = databaseConfig.production as SequelizeModuleOptions;
      break;
    case 'dev':
    case 'development':
      console.log('[DEV_DB_CONNECTED]');
      config = databaseConfig.development as SequelizeModuleOptions;
      break;
    case 'test':
    case 'stage':
      console.log('[STAGE_DB_CONNECTED]');
      config = databaseConfig.test as SequelizeModuleOptions;
      break;
    default:
      config = databaseConfig.development as SequelizeModuleOptions;
      break;
  }
  return config;
};

