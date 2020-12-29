import { NestFactory } from '@nestjs/core';
import { TrackerModule } from './tracker.module';

async function bootstrap() {
  const app = await NestFactory.create(TrackerModule);
  await app.listen(3000);
  console.log(`http://localhost:3000`);
}
bootstrap();
