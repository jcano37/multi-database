import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { join } from 'path';

export const ormConfig = async (
  configService: ConfigService,
): Promise<TypeOrmModuleOptions> => {
  const dbType = configService.get<'postgres' | 'mysql' | 'sqlite'>(
    'database.type',
  );

  const baseConfig = {
    synchronize: configService.get<boolean>('database.synchronize'),
    logging: configService.get<boolean>('database.logging'),
    entities: [join(__dirname, '..', '**', '*.entity{.ts,.js}')],
    migrations: [join(__dirname, '..', 'migrations', '*{.ts,.js}')],
  };

  // Debug logging
  console.log('Database Configuration:', {
    type: dbType,
    host: configService.get<string>('database.host'),
    port: configService.get<number>('database.port'),
    database: configService.get<string>('database.database'),
    synchronize: configService.get<boolean>('database.synchronize'),
    logging: configService.get<boolean>('database.logging'),
  });

  switch (dbType) {
    case 'sqlite':
      return {
        type: 'sqlite',
        database: configService.get<string>('database.sqlitePath'),
        ...baseConfig,
      };

    case 'mysql':
      return {
        type: 'mysql',
        host: configService.get<string>('database.host'),
        port: configService.get<number>('database.port'),
        username: configService.get<string>('database.username'),
        password: configService.get<string>('database.password'),
        database: configService.get<string>('database.database'),
        ...baseConfig,
      };

    case 'postgres':
    default:
      return {
        type: 'postgres',
        host: configService.get<string>('database.host'),
        port: configService.get<number>('database.port'),
        username: configService.get<string>('database.username'),
        password: configService.get<string>('database.password'),
        database: configService.get<string>('database.database'),
        ...baseConfig,
      };
  }
};
