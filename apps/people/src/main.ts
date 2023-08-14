import { NestFactory } from '@nestjs/core';
import { PeopleModule } from './people.module';
import { SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { PeopleSwaggerConfig } from 'libs/config/swagger/people.config';
import { corsOptions } from 'libs/config/cors.config';
import helmet from 'helmet';
import { Handler, Context, Callback } from 'aws-lambda';
import serverlessExpress from '@vendia/serverless-express';

let server: Handler;

async function bootstrap() {
  const app = await NestFactory.create(PeopleModule);

  app.setGlobalPrefix('api');
  app.useGlobalPipes(new ValidationPipe());

  // Security measurements
  app.use(helmet());
  app.enableCors(corsOptions);
  await app.init();

  // Swagger documentation
  const document = SwaggerModule.createDocument(app, PeopleSwaggerConfig);
  SwaggerModule.setup('api/planets', app, document);

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
