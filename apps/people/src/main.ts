import { NestFactory } from '@nestjs/core';
import { PeopleModule } from './people.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(PeopleModule);
  app.setGlobalPrefix('api');
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3001);
}
bootstrap();
