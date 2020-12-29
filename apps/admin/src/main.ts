import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';

import { AdminConfigType } from 'config/admin.config';
import { AdminModule } from './admin.module';

async function bootstrap() {
  const app = await NestFactory.create(AdminModule);

  const configService = app.get(ConfigService);
  const port = configService.get<AdminConfigType>('admin').port;

  await app.listen(port);
  console.log(`admin server is run in http://localhost:${port}`);
}
bootstrap();
