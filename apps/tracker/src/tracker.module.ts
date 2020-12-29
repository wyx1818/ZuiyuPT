import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import tracker from 'config/admin.config';
import { AnnounceController } from './announce/announce.controller';
import { AnnounceService } from './announce/announce.service';
import { AnnounceModule } from './announce/announce.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [tracker],
    }),
    AnnounceModule,
  ],
  controllers: [AnnounceController],
  providers: [AnnounceService],
})
export class TrackerModule {}
