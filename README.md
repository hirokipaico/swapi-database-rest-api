<p align="center">
  <img src="https://upload.wikimedia.org/wikipedia/commons/6/6c/Star_Wars_Logo.svg" width="200" alt="Star Wars Logo" />
</p>
<p align="center" style="font-size:36px;">Star Wars Database REST API<p>

## Description

Star wars database monorepo project built with [Nest](https://github.com/nestjs/nest), [Typescript](https://www.typescriptlang.org/), [Serverless](https://serverless.com), [TypeORM](https://https://typeorm.io/), [PostgreSQL](https://https://www.postgresql.org/) and OpenAPI/Swagger documentation. This project consists of two separates Nestjs subapps called `planets` and `people`, each one with its own `main.ts` entry file with their respective handlers for AWS Lambda deployment.

AWS Lambda public endpoint preview: https://5k2bq0ioh0.execute-api.us-east-2.amazonaws.com/

Live deployed HTTP request examples: 
 - GET /api/planets/?page=2 : [Link](https://5k2bq0ioh0.execute-api.us-east-2.amazonaws.com/api/planets/?page=2) 
 - GET /api/people/1 : [Link](https://5k2bq0ioh0.execute-api.us-east-2.amazonaws.com/api/people/1)


## Installation

Install all dependencies to run the monorepo project.

```bash
$ npm install
```

## Environment

Before starting the apps, create and `.env` file in the root folder of the project, with the following template:

```bash
# External SWAPI (Star Wars) API URL for consumption
SWAPI_BASE_URL=https://swapi.dev/api

# Nestjs application port
PORT=3000 

# Amazon RDS Postgres connection variables
AWS_RDB_POSTGRES_DB_HOST=your.awsrds.host
AWS_RDB_POSTGRES_DB_PORT=5432
AWS_RDB_POSTGRES_DB_USERNAME=yourusername
AWS_RDB_POSTGRES_DB_PASSWORD=yourpassword
AWS_RDB_POSTGRES_DB_NAME=yourdbname 
```

## Build the app

Run the following script to create the `dist` folder to be used by the serverless framework.

```bash
# build 'dist' folder
$ npm run start
```

## Test

You can alternatively run the unit tests in the monorepo project for evaluation purposes.

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Deploy with Serverless framework

The project contains the appropiated plugins to be 

```bash
# offline testing
serverless offline

# deployment to AWS Cloudformation with lambda functions
serverless deploy
```

## License

Nest is [MIT licensed](LICENSE).
