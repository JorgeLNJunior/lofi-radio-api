/* eslint-disable @typescript-eslint/no-var-requires */
const { config } = require('dotenv');
config({ path: process.env.NODE_ENV === 'test' ? '.env.test' : '.env' });

module.exports = {
  type: process.env.DB_TYPE || 'mysql',
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 3306,
  username: process.env.DB_USER || 'root',
  password: process.env.DB_PASS || '',
  database: process.env.DB_NAME || 'test',
  synchronize: false,
  logging: false,
  entities: [
    process.env.NODE_ENV === 'production' ? '**/*.entity.js' : '**/*.entity.ts',
  ],
  migrationsTableName: 'typeorm_migrations',
  migrations: [
    process.env.NODE_ENV === 'production'
      ? 'dist/database/migration/**/*.js'
      : 'src/database/migration/**/*.ts',
  ],
  migrationsRun: process.env.NODE_ENV === 'production' ? true : false,
  seeds: [
    process.env.NODE_ENV === 'production'
      ? 'dist/database/seeds/**/*.js'
      : 'src/database/seeds/**/*.ts',
  ],
  factories: [
    process.env.NODE_ENV === 'production'
      ? 'dist/database/factories/**/*.js'
      : 'src/database/factories/**/*.ts',
  ],
  cli: {
    entitiesDir: 'src/app/entity',
    migrationsDir: 'src/database/migration',
  },
};
