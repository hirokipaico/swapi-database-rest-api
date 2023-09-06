import { ConfigModule, ConfigService } from '@nestjs/config';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import {
  TypeOrmModuleOptions,
  TypeOrmModuleAsyncOptions,
} from '@nestjs/typeorm';
import { join } from 'path';
import { Planet } from 'apps/planets/src/entities/planet.entity';
import { Person } from 'apps/people/src/entities/person.entity';

const postgresConfig = (
  configService: ConfigService,
): PostgresConnectionOptions => {
  return {
    type: 'postgres',
    host: configService.get<string>('AWS_RDB_POSTGRES_DB_HOST'),
    port: +(configService.get<string>('AWS_RDB_POSTGRES_DB_PORT') || 5432),
    username: configService.get<string>('AWS_RDB_POSTGRES_DB_USERNAME'),
    password: configService.get<string>('AWS_RDB_POSTGRES_DB_PASSWORD'),
    database: configService.get<string>('AWS_RDB_POSTGRES_DB_NAME'),
    entities: [Planet, Person],
    migrations: [join(__dirname + '../migrations/*{.ts,.js}')],
    ssl: true,
    extra: {
      ssl: {
        rejectUnauthorized: false,
      },
    },
    migrationsRun: true,
    synchronize: true,
    logging: false,
  };
};

export const typeOrmConfig: TypeOrmModuleAsyncOptions = {
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: async (
    configService: ConfigService,
  ): Promise<TypeOrmModuleOptions> => {
    return postgresConfig(configService);
  },
};
