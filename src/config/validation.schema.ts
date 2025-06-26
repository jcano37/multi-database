import * as Joi from 'joi';

export const validationSchema = Joi.object({
  // Application
  NODE_ENV: Joi.string()
    .valid('development', 'production', 'test')
    .default('development'),
  PORT: Joi.number().default(3000),
  IS_DOCKER: Joi.boolean().default(false),

  // Database
  DB_TYPE: Joi.string().valid('postgres', 'sqlite').default('postgres'),
  DB_HOST: Joi.string()
    .when('DB_TYPE', {
      is: 'postgres',
      then: Joi.required(),
      otherwise: Joi.optional(),
    })
    .default('localhost'),
  DB_PORT: Joi.number()
    .when('DB_TYPE', {
      is: 'postgres',
      then: Joi.required(),
      otherwise: Joi.optional(),
    })
    .default(5432),
  DB_USERNAME: Joi.string()
    .when('DB_TYPE', {
      is: 'postgres',
      then: Joi.required(),
      otherwise: Joi.optional(),
    })
    .default('postgres'),
  DB_PASSWORD: Joi.string()
    .when('DB_TYPE', {
      is: 'postgres',
      then: Joi.required(),
      otherwise: Joi.optional(),
    })
    .default('postgres'),
  DB_DATABASE: Joi.string()
    .when('DB_TYPE', {
      is: 'postgres',
      then: Joi.required(),
      otherwise: Joi.optional(),
    })
    .default('multidb'),
  DB_SYNCHRONIZE: Joi.boolean().default(true),
  DB_LOGGING: Joi.boolean().default(true),
  DB_SQLITE_PATH: Joi.string()
    .when('DB_TYPE', {
      is: 'sqlite',
      then: Joi.required(),
      otherwise: Joi.optional(),
    })
    .default(':memory:'),

  // Adminer
  ADMINER_PORT: Joi.number().default(8080),
});
