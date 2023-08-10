import { Module } from '@nestjs/common';
import { PeopleController } from './controllers/people.controller';
import { PeopleService } from './services/people.service';

@Module({
  imports: [],
  controllers: [PeopleController],
  providers: [PeopleService],
})
export class PeopleModule {}
