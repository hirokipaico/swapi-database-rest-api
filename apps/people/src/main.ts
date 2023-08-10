import { NestFactory } from '@nestjs/core';
import { PeopleModule } from './people.module';

async function bootstrap() {
  const app = await NestFactory.create(PeopleModule);
  await app.listen(3000);
}
bootstrap();
