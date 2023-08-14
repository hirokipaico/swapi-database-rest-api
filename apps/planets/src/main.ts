import { NestFactory } from '@nestjs/core';
import { PlanetsModule } from './planets.module';
import { SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { PlanetSwaggerConfig } from 'libs/config/swagger/planet.config';
import { corsOptions } from 'libs/config/cors.config';
import helmet from 'helmet';
import { Handler, Context, Callback } from 'aws-lambda';
import serverlessExpress from '@vendia/serverless-express';

let server: Handler;

async function bootstrap() {
  const app = await NestFactory.create(PlanetsModule);

  app.setGlobalPrefix('api');
  app.useGlobalPipes(new ValidationPipe());

  // Security measurements
  app.use(helmet());
  app.enableCors(corsOptions);

  // Swagger documentation
  const document = SwaggerModule.createDocument(app, PlanetSwaggerConfig);
  SwaggerModule.setup('api/people', app, document);

  await app.init();

  const expressApp = app.getHttpAdapter().getInstance();
  return serverlessExpress({ app: expressApp });
}

export const handler: Handler = async (
  event: any,
  context: Context,
  callback: Callback,
) => {
  server = server ?? (await bootstrap());
  return server(event, context, callback);
};
