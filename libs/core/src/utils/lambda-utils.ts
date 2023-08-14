// apps/people/src/lambda-utils.ts
import { NestFactory } from '@nestjs/core';
import { INestApplication } from '@nestjs/common';

export const createLambdaHandler = async (
  module: any,
): Promise<INestApplication> => {
  const nestApp = await NestFactory.create(module);
  await nestApp.init();
  return nestApp;
};
