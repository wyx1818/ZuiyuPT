import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';

import { CmsConfigType } from 'config/cms.config';
import { CmsModule } from './cms.module';

async function bootstrap() {
  const app = await NestFactory.create(CmsModule);

  const configService = app.get(ConfigService);
  const port = configService.get<CmsConfigType>('cms').port;

  await app.listen(port);
  console.log(`cms server is run in http://localhost:${port}`);
}
bootstrap();
