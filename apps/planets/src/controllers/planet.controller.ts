import { Controller, Get, Query, Param } from '@nestjs/common';
import { Planet } from '../entities/planet.entity';
import { PlanetService } from '../services/planet.service';
import { PageQueryDto } from '../dtos/page-query.dto';
import { IdParamDto } from '../dtos/id-param.dto';

@Controller('planets')
export class PlanetController {
  constructor(private readonly planetService: PlanetService) {}

  @Get()
  async getAllPlanets(@Query() query: PageQueryDto): Promise<Planet[]> {
    const page = query.page;
    return await this.planetService.getPlanetsUntilPageFromSWAPI(page);
  }

  @Get(':planetId')
  async getPlanetById(@Param('planetId') params: IdParamDto): Promise<Planet> {
    const id = params.id;
    return await this.planetService.getPlanetById(id);
  }
}
