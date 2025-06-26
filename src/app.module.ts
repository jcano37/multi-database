import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { ExampleModule } from './modules/example/example.module';
import { appConfig, databaseConfig } from './config/configuration';
import { validationSchema } from './config/validation.schema';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig, databaseConfig],
      validationSchema,
      validationOptions: {
        abortEarly: true,
      },
      cache: true,
      expandVariables: true,
      envFilePath: '.env',
    }),
    DatabaseModule,
    ExampleModule,
  ],
})
export class AppModule {}
