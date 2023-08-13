import {
  Controller,
  Get,
  Query,
  Param,
  InternalServerErrorException,
  Post,
  Body,
} from '@nestjs/common';
import { PeopleService } from '../services/people.service';
import { Person } from '../entities/person.entity';
import { PageQueryDto } from '@app/core/dtos/page-query.dto';
import { IdParamDto } from '@app/core/dtos/id-param.dto';
import { InputPersonDto } from '../dtos/person.dto';

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

  @Post()
  async postPerson(@Body() inputDto: InputPersonDto) {
    try {
      const nextId = await this.peopleService.getNextAvailableId();
      const currentDate = new Date();

      const person: Person = {
        id: nextId,
        created: currentDate,
        edited: currentDate,
        url: null,
        ...inputDto,
      };

      const savedPerson = await this.peopleService.savePerson(person);
      return {
        message: 'Person information saved successfully',
        data: savedPerson,
      };
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }
}
