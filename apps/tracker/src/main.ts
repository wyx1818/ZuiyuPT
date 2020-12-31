import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';

import { TrackerModule } from './tracker.module';
import { TrackerConfigType } from '@config/tracker.config';

async function bootstrap() {
  const app = await NestFactory.create(TrackerModule);

  const configService = app.get(ConfigService);
  const port = configService.get<TrackerConfigType>('tracker').port;

  await app.listen(port);
  console.log(`tracker server is run in http://localhost:${port}`);
}
bootstrap();
