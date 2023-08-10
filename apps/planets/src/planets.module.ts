import { Module } from '@nestjs/common';
import { PlanetController } from './controllers/planet.controller';
import { PlanetService } from './services/planet.service';

@Module({
  imports: [],
  controllers: [PlanetController],
  providers: [PlanetService],
})
export class PlanetsModule {}
