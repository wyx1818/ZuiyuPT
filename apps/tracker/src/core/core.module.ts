import { Module } from '@nestjs/common';
import { APP_FILTER, APP_GUARD } from '@nestjs/core';
import { I18nJsonParser, I18nModule } from 'nestjs-i18n';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { TrackerConfigType } from '@config/tracker.config';
import { TrackerExceptionFilter } from '@tracker/common/filters';
import { AuthGuard } from '@tracker/common/guards';
import { I18nQueryResolver } from '@tracker/common/resolvers';

@Module({
  imports: [
    // import i18n global service
    I18nModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => config.get<TrackerConfigType>('tracker').i18n,
      parser: I18nJsonParser,
      resolvers: [{ use: I18nQueryResolver, options: [] }],
    }),
  ],
  providers: [
    {
      // Globally register auth guard
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    {
      // Globally register tracker exception filter
      provide: APP_FILTER,
      useClass: TrackerExceptionFilter,
    },
  ],
})
export class CoreModule {}
