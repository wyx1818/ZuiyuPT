import { Module } from '@nestjs/common';
import { I18nJsonParser, I18nModule } from 'nestjs-i18n';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TrackerConfigType } from 'config/tracker.config';

@Module({
  imports: [
    I18nModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (config: ConfigService) => config.get<TrackerConfigType>('tracker').i18n,
      parser: I18nJsonParser,
      inject: [ConfigService],
    }),
  ],
})
export class CoreModule {}
