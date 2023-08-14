import { configure as serverlessExpress } from '@vendia/serverless-express';
import { createLambdaHandler } from '@app/core/utils/lambda-utils';
import { PeopleModule } from './src/people.module';

let cachedServer;

export const handler = async (event, context) => {
  if (!cachedServer) {
    const nestApp = await createLambdaHandler(PeopleModule);
    cachedServer = serverlessExpress({
      app: nestApp.getHttpAdapter().getInstance(),
    });
  }

  return cachedServer(event, context);
};
