import { Controller, Get, Query, Param } from '@nestjs/common';
import {
  ApiTags,
  ApiQuery,
  ApiParam,
  ApiOkResponse,
  ApiBadRequestResponse,
  ApiInternalServerErrorResponse,
} from '@nestjs/swagger';
import { PlanetService } from '../services/planet.service';
import { Planet } from '../entities/planet.entity';
import { PositiveIntPipe } from '@app/core/pipes/positive-integer.pipe';
import { Planeta } from '../interfaces/planeta.interface';

@ApiTags('planets')
@Controller('planets')
export class PlanetController {
  constructor(private readonly planetService: PlanetService) {}

  @Get()
  @ApiQuery({
    name: 'page',
    type: Number,
    required: true,
    example: 1,
  })
  @ApiOkResponse({
    type: Planet,
    isArray: true,
  })
  @ApiBadRequestResponse({
    description: `Query element 'page' must be a positive integer.`,
  })
  @ApiInternalServerErrorResponse({
    description: `An internal server error ocurred.`,
  })
  async getAllPlanets(
    @Query('page', PositiveIntPipe) page: number,
  ): Promise<Partial<Planeta>[]> {
    try {
      return await this.planetService.getPlanetsUntilPageFromSWAPI(page);
    } catch (error) {
      throw error;
    }
  }

  @Get(':id')
  @ApiParam({
    name: 'id',
    type: Number,
    required: true,
    example: 1,
  })
  @ApiOkResponse({
    type: Planet,
  })
  @ApiBadRequestResponse({
    description: `Param element 'id' must be a positive integer.`,
  })
  @ApiInternalServerErrorResponse({
    description: `An internal server error ocurred.`,
  })
  async getPlanetById(
    @Param('id', PositiveIntPipe) id: number,
  ): Promise<Planeta> {
    try {
      return await this.planetService.getPlanetById(id);
    } catch (error) {
      throw error;
    }
  }
}
