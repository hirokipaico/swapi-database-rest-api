import {
  Controller,
  Get,
  Query,
  Param,
  InternalServerErrorException,
} from '@nestjs/common';
import { PlanetService } from '../services/planet.service';
import { Planet } from '../entities/planet.entity';
import { PageQueryDto } from '@app/core/dtos/page-query.dto';
import { IdParamDto } from '@app/core/dtos/id-param.dto';

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
  async getPlanetById(
    @Param()
    params: IdParamDto,
  ): Promise<Planet> {
    try {
      const planetId = params.planetId;
      return await this.planetService.getPlanetById(planetId);
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }
}
