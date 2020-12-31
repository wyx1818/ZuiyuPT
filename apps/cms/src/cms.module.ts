import { Module } from '@nestjs/common';
import { TypegooseModule } from 'nestjs-typegoose';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { CmsConfigType, cmsConfig } from '@config/cms.config';

import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [cmsConfig],
      envFilePath: ['.env.development'],
    }),
    TypegooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => config.get<CmsConfigType>('cms').db,
    }),
    UsersModule,
  ],
})
export class CmsModule {}
