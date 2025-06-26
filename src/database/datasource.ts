import { DataSource, DataSourceOptions } from 'typeorm';
import { config } from 'dotenv';
import { join } from 'path';

// Cargar variables de entorno
config();

const getDataSourceOptions = (): DataSourceOptions => {
  const baseConfig = {
    synchronize: false, // Desactivado para migraciones
    logging: true,
    entities: [join(__dirname, '..', '**', '*.entity{.ts,.js}')],
    migrations: [join(__dirname, '..', 'migrations', '*{.ts,.js}')],
    subscribers: [],
  };

  switch (process.env.ACTIVE_DB) {
    case 'mysql':
      return {
        type: 'mysql',
        host: process.env.MYSQL_HOST || 'localhost',
        port: parseInt(process.env.MYSQL_PORT || '3306', 10),
        username: process.env.MYSQL_USERNAME || 'mysql',
        password: process.env.MYSQL_PASSWORD || 'mysql',
        database: process.env.MYSQL_DATABASE || 'multidb',
        ...baseConfig,
      };

    case 'sqlite':
      return {
        type: 'sqlite',
        database: process.env.SQLITE_PATH || ':memory:',
        ...baseConfig,
      };

    case 'postgres':
    default:
      return {
        type: 'postgres',
        host: process.env.POSTGRES_HOST || 'localhost',
        port: parseInt(process.env.POSTGRES_PORT || '5432', 10),
        username: process.env.POSTGRES_USERNAME || 'postgres',
        password: process.env.POSTGRES_PASSWORD || 'postgres',
        database: process.env.POSTGRES_DATABASE || 'multidb',
        ...baseConfig,
      };
  }
};

export default new DataSource(getDataSourceOptions());
