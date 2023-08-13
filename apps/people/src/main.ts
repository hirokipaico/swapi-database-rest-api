import { NestFactory } from '@nestjs/core';
import { PeopleModule } from './people.module';
import { SwaggerModule } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import { PeopleSwaggerConfig } from 'libs/config/swagger/people.config';
import helmet from 'helmet';
import { corsOptions } from 'libs/config/cors.config';

async function bootstrap() {
  const app = await NestFactory.create(PeopleModule);
  const configService = app.get(ConfigService);

  app.setGlobalPrefix('api');
  app.useGlobalPipes(new ValidationPipe());

  // Security measurements
  app.use(helmet());
  app.enableCors(corsOptions);

  // Swagger documentation
  const document = SwaggerModule.createDocument(app, PeopleSwaggerConfig);
  SwaggerModule.setup('api', app, document);

  const port = configService.get<number>('PORT') || 3001;
  await app.listen(port);
}
bootstrap();
