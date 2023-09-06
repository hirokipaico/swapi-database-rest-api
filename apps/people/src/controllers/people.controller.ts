import { Controller, Get, Post, Query, Param, Body } from '@nestjs/common';
import {
  ApiTags,
  ApiQuery,
  ApiParam,
  ApiOkResponse,
  ApiBadRequestResponse,
  ApiInternalServerErrorResponse,
} from '@nestjs/swagger';
import { PeopleService } from '../services/people.service';
import { Person } from '../entities/person.entity';
import { InputPersonDto } from '../dtos/person.dto';
import { PositiveIntPipe } from '@app/core/pipes/positive-integer.pipe';
import { Persona } from '../interfaces/persona.interface';

@ApiTags('people')
@Controller('people')
export class PeopleController {
  constructor(private readonly peopleService: PeopleService) {}

  @Get()
  @ApiQuery({
    name: 'page',
    type: Number,
    example: 1,
  })
  @ApiOkResponse({
    type: Person,
    isArray: true,
  })
  @ApiBadRequestResponse({
    description: `Query element 'page' must be a positive integer.`,
  })
  @ApiInternalServerErrorResponse({
    description: `An internal server error ocurred.`,
  })
  async getAllPeople(
    @Query('page', PositiveIntPipe) page: number,
  ): Promise<Partial<Persona>[]> {
    try {
      return this.peopleService.getAllPeopleFromSWAPI(page);
    } catch (error) {
      throw error;
    }
  }

  @Get(':id')
  @ApiParam({
    name: 'id',
    type: Number,
    required: true,
  })
  @ApiOkResponse({
    type: Person,
  })
  @ApiBadRequestResponse({
    description: `Param element 'id' must be a positive integer.`,
  })
  @ApiInternalServerErrorResponse({
    description: `An internal server error ocurred.`,
  })
  async getPersonById(
    @Param('id', PositiveIntPipe)
    id: number,
  ): Promise<Persona> {
    try {
      return this.peopleService.getPersonById(id);
    } catch (error) {
      throw error;
    }
  }

  @Post()
  @ApiOkResponse({
    description: 'Person information saved successfully.',
    type: Person,
  })
  @ApiBadRequestResponse({
    description: 'Body element must not be empty/must be a string.',
  })
  @ApiInternalServerErrorResponse({
    description: 'An internal server error ocurred.',
  })
  async postPerson(@Body() inputDto: InputPersonDto) {
    try {
      const nextId = await this.peopleService.getNextAvailableId();
      const currentDate = new Date().toISOString();

      const person: Person = {
        id: nextId,
        created: currentDate,
        edited: currentDate,
        url: null,
        ...inputDto,
      };

      const savedPerson = await this.peopleService.savePerson(person);
      return {
        message: 'Person information saved successfully.',
        data: savedPerson,
      };
    } catch (error) {
      throw error;
    }
  }
}
