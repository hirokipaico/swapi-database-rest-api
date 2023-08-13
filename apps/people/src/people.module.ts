import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CoreModule } from '@app/core';
import { PeopleController } from './controllers/people.controller';
import { PeopleService } from './services/people.service';
import { Person } from './entities/person.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    CoreModule,
    TypeOrmModule.forFeature([Person]),
    HttpModule,
  ],
  controllers: [PeopleController],
  providers: [PeopleService],
})
export class PeopleModule {}
