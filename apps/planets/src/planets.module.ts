import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios/dist';
import { ConfigModule } from '@nestjs/config';
import { PlanetController } from './controllers/planet.controller';
import { PlanetService } from './services/planet.service';

@Module({
  imports: [HttpModule, ConfigModule.forRoot()],
  controllers: [PlanetController],
  providers: [PlanetService],
})
export class PlanetsModule {}
