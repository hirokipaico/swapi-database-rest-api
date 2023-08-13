import { NestFactory } from '@nestjs/core';
import { PlanetsModule } from './planets.module';
import { SwaggerModule } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import { PlanetSwaggerConfig } from 'libs/config/swagger/planet.config';

async function bootstrap() {
  const app = await NestFactory.create(PlanetsModule);
  const configService = app.get(ConfigService);

  app.setGlobalPrefix('api');
  app.useGlobalPipes(new ValidationPipe());

  // Swagger documentation
  const document = SwaggerModule.createDocument(app, PlanetSwaggerConfig);
  SwaggerModule.setup('api', app, document);

  const port = configService.get<number>('PORT') || 3000;
  await app.listen(port);
}
bootstrap();
