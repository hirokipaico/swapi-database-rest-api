import { configure as serverlessExpress } from '@vendia/serverless-express';
import { createLambdaHandler } from '@app/core/utils/lambda-utils';
import { PlanetsModule } from './src/planets.module';

let cachedServer;

export const handler = async (event, context) => {
  if (!cachedServer) {
    const nestApp = await createLambdaHandler(PlanetsModule);
    cachedServer = serverlessExpress({
      app: nestApp.getHttpAdapter().getInstance(),
    });
  }

  return cachedServer(event, context);
};
