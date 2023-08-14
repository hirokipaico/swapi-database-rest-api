import { NestFactory } from '@nestjs/core';
import { PlanetsModule } from './planets.module';
import { ValidationPipe } from '@nestjs/common';
import helmet from 'helmet';
import { corsOptions } from 'libs/config/cors.config';
import { Handler } from 'aws-lambda';

let cachedApp;

async function bootstrap() {
  if (!cachedApp) {
    const app = await NestFactory.create(PlanetsModule);

    app.setGlobalPrefix('api');
    app.useGlobalPipes(new ValidationPipe());

    // Security measurements
    app.use(helmet());
    app.enableCors(corsOptions);

    cachedApp = app;
  }
  return cachedApp;
}

export const handler: Handler = async (event: any, context: any) => {
  context.callbackWaitsForEmptyEventLoop = false;
  const app = await bootstrap();
  return app.getHttpAdapter().proxy(event, context);
};
