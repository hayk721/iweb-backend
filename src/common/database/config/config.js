// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config({ path: '../../../.env' });

const basicSettings = {
  dialect: 'mariadb',
  logging: false,
  force: false,
  timezone: '+00:00',
  dateStrings: true,
  define: { charset: 'utf8', collate: 'utf8_general_ci' },
  pool: {
    max: 30,
    min: 0,
    idl: 10000,
    acquire: 60000,
  },
};
module.exports = {
  development: {
    ...basicSettings,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
  },
  production: {
    ...basicSettings,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
  },
  test: {
    ...basicSettings,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
  },
};
