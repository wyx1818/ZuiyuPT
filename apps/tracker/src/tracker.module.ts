import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import tracker from '@config/tracker.config';
import { AnnounceController, AnnounceService, AnnounceModule } from '@tracker/announce';
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
