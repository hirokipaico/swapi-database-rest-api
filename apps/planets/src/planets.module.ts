import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios/dist';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CoreModule } from '@app/core';
import { PlanetController } from './controllers/planet.controller';
import { PlanetService } from './services/planet.service';
import { Planet } from './entities/planet.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    CoreModule,
    TypeOrmModule.forFeature([Planet]),
    HttpModule,
  ],
  providers: [PlanetService],
  controllers: [PlanetController],
})
export class PlanetsModule {}
