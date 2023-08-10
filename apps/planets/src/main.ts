import { NestFactory } from '@nestjs/core';
import { PlanetsModule } from './planets.module';

async function bootstrap() {
  const app = await NestFactory.create(PlanetsModule);
  await app.listen(3000);
}
bootstrap();
