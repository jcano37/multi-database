import Joi from 'joi';

export const validationSchema = Joi.object({
  // Application
  NODE_ENV: Joi.string()
    .valid('development', 'production', 'test')
    .default('development'),
  PORT: Joi.number().default(3000),
  IS_DOCKER: Joi.boolean().default(false),

  // Database Selector
  ACTIVE_DB: Joi.string()
    .valid('postgres', 'mysql', 'sqlite')
    .default('postgres'),

  // PostgreSQL Configuration
  POSTGRES_HOST: Joi.string()
    .when('ACTIVE_DB', {
      is: 'postgres',
      then: Joi.required(),
      otherwise: Joi.optional(),
    })
    .default('localhost'),
  POSTGRES_PORT: Joi.number()
    .when('ACTIVE_DB', {
      is: 'postgres',
      then: Joi.required(),
      otherwise: Joi.optional(),
    })
    .default(5432),
  POSTGRES_USERNAME: Joi.string()
    .when('ACTIVE_DB', {
      is: 'postgres',
      then: Joi.required(),
      otherwise: Joi.optional(),
    })
    .default('postgres'),
  POSTGRES_PASSWORD: Joi.string()
    .when('ACTIVE_DB', {
      is: 'postgres',
      then: Joi.required(),
      otherwise: Joi.optional(),
    })
    .default('postgres'),
  POSTGRES_DATABASE: Joi.string()
    .when('ACTIVE_DB', {
      is: 'postgres',
      then: Joi.required(),
      otherwise: Joi.optional(),
    })
    .default('multidb'),

  // MySQL Configuration
  MYSQL_HOST: Joi.string()
    .when('ACTIVE_DB', {
      is: 'mysql',
      then: Joi.required(),
      otherwise: Joi.optional(),
    })
    .default('localhost'),
  MYSQL_PORT: Joi.number()
    .when('ACTIVE_DB', {
      is: 'mysql',
      then: Joi.required(),
      otherwise: Joi.optional(),
    })
    .default(3306),
  MYSQL_USERNAME: Joi.string()
    .when('ACTIVE_DB', {
      is: 'mysql',
      then: Joi.required(),
      otherwise: Joi.optional(),
    })
    .default('mysql'),
  MYSQL_PASSWORD: Joi.string()
    .when('ACTIVE_DB', {
      is: 'mysql',
      then: Joi.required(),
      otherwise: Joi.optional(),
    })
    .default('mysql'),
  MYSQL_DATABASE: Joi.string()
    .when('ACTIVE_DB', {
      is: 'mysql',
      then: Joi.required(),
      otherwise: Joi.optional(),
    })
    .default('multidb'),
  MYSQL_ROOT_PASSWORD: Joi.string()
    .when('ACTIVE_DB', {
      is: 'mysql',
      then: Joi.required(),
      otherwise: Joi.optional(),
    })
    .default('root'),

  // SQLite Configuration
  SQLITE_PATH: Joi.string()
    .when('ACTIVE_DB', {
      is: 'sqlite',
      then: Joi.required(),
      otherwise: Joi.optional(),
    })
    .default(':memory:'),

  // Common Database Configuration
  DB_SYNCHRONIZE: Joi.boolean().default(true),
  DB_LOGGING: Joi.boolean().default(true),

  // Adminer
  ADMINER_PORT: Joi.number().default(8080),
});
