import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import tracker from 'config/tracker.config';
import { AnnounceController } from './announce/announce.controller';
import { AnnounceService } from './announce/announce.service';
import { AnnounceModule } from './announce/announce.module';
import { CoreModule } from './core/core.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [tracker],
      envFilePath: ['.env.development'],
    }),
    AnnounceModule,
    CoreModule,
  ],
  controllers: [AnnounceController],
  providers: [AnnounceService],
})
export class TrackerModule {}
