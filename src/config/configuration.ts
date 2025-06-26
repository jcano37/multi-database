import { registerAs } from '@nestjs/config';

export const appConfig = registerAs('app', () => ({
  nodeEnv: process.env.NODE_ENV || 'development',
  port: parseInt(process.env.PORT || '3000', 10),
  isProduction: process.env.NODE_ENV === 'production',
  isDevelopment: process.env.NODE_ENV === 'development',
  isTest: process.env.NODE_ENV === 'test',
}));

export const databaseConfig = registerAs('database', () => {
  const isDocker = process.env.IS_DOCKER === 'true';
  const activeDb = process.env.ACTIVE_DB || 'postgres';

  const dbConfigs = {
    postgres: {
      type: 'postgres',
      host: isDocker ? 'postgres' : process.env.POSTGRES_HOST || 'localhost',
      port: parseInt(process.env.POSTGRES_PORT || '5432', 10),
      username: process.env.POSTGRES_USERNAME || 'postgres',
      password: process.env.POSTGRES_PASSWORD || 'postgres',
      database: process.env.POSTGRES_DATABASE || 'multidb',
    },
    mysql: {
      type: 'mysql',
      host: isDocker ? 'mysql' : process.env.MYSQL_HOST || 'localhost',
      port: parseInt(process.env.MYSQL_PORT || '3306', 10),
      username: process.env.MYSQL_USERNAME || 'mysql',
      password: process.env.MYSQL_PASSWORD || 'mysql',
      database: process.env.MYSQL_DATABASE || 'multidb',
    },
    sqlite: {
      type: 'sqlite',
      database: process.env.SQLITE_PATH || ':memory:',
    },
  };

  return {
    ...dbConfigs[activeDb],
    synchronize: process.env.DB_SYNCHRONIZE === 'true',
    logging: process.env.DB_LOGGING === 'true',
  };
});
