import { Module } from '@nestjs/common';
import { TypegooseModule } from 'nestjs-typegoose';
import { ConfigModule, ConfigService } from '@nestjs/config';

import cmsConfig, { CmsConfigType } from 'config/cms.config';

import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [cmsConfig],
      envFilePath: ['.env.development'],
    }),
    TypegooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (config: ConfigService) => config.get<CmsConfigType>('cms').db,
      inject: [ConfigService],
    }),
    UsersModule,
  ],
})
export class CmsModule {}
