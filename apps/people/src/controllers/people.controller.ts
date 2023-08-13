import {
  Controller,
  Get,
  Query,
  InternalServerErrorException,
} from '@nestjs/common';
import { PeopleService } from '../services/people.service';
import { Person } from '../entities/person.entity';
import { PageQueryDto } from '@app/core/dtos/page-query.dto';

@Controller('people')
export class PeopleController {
  constructor(private readonly peopleService: PeopleService) {}

  @Get()
  async getAllPlanets(@Query() query: PageQueryDto): Promise<Person[]> {
    try {
      const page = query.page;
      return this.peopleService.getAllPeopleFromSWAPI(page);
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }
}
