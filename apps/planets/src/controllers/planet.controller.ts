import {
  Controller,
  Get,
  Query,
  Param,
  InternalServerErrorException,
} from '@nestjs/common';
import { Planet } from '../entities/planet.entity';
import { PlanetService } from '../services/planet.service';
import { PageQueryDto } from '../dtos/page-query.dto';

@Controller('planets')
export class PlanetController {
  constructor(private readonly planetService: PlanetService) {}

  @Get()
  async getAllPlanets(@Query() query: PageQueryDto): Promise<Planet[]> {
    try {
      const page = query.page;
      return await this.planetService.getPlanetsUntilPageFromSWAPI(page);
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  @Get(':planetId')
  async getPlanetById(@Param('planetId') id: number): Promise<Planet> {
    try {
      return await this.planetService.getPlanetById(id);
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }
}
