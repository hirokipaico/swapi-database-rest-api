import {
  Controller,
  Get,
  Query,
  Param,
  InternalServerErrorException,
} from '@nestjs/common';
import { PeopleService } from '../services/people.service';
import { Person } from '../entities/person.entity';
import { PageQueryDto } from '@app/core/dtos/page-query.dto';
import { IdParamDto } from '@app/core/dtos/id-param.dto';

@Controller('people')
export class PeopleController {
  constructor(private readonly peopleService: PeopleService) {}

  @Get()
  async getAllPeople(@Query() query: PageQueryDto): Promise<Person[]> {
    try {
      const page = query.page;
      return this.peopleService.getAllPeopleFromSWAPI(page);
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  @Get(':id')
  async getPersonById(
    @Param()
    params: IdParamDto,
  ): Promise<Person> {
    try {
      const personId = params.id;
      return this.peopleService.getPersonById(personId);
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }
}
