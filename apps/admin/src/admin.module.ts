import { Module } from '@nestjs/common';
import { TypegooseModule } from 'nestjs-typegoose';
import { ConfigModule, ConfigService } from '@nestjs/config';

import adminConfig, { AdminConfigType } from 'config/admin.config';

import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [adminConfig],
      envFilePath: ['.env.development'],
    }),
    TypegooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (config: ConfigService) => {
        return config.get<AdminConfigType>('admin').db;
      },
      inject: [ConfigService],
    }),
    UsersModule,
  ],
})
export class AdminModule {}
