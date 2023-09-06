import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { firstValueFrom, map } from 'rxjs';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { PlanetRepository } from '../repositories/planet.repository';
import { Planet } from '../entities/planet.entity';
import { Planeta } from '../interfaces/planeta.interface';

@Injectable()
export class PlanetService {
  private readonly logger = new Logger(PlanetService.name);

  constructor(
    private readonly configService: ConfigService,
    private readonly httpService: HttpService,
    @InjectRepository(Planet)
    private readonly planetRepository: PlanetRepository,
  ) {}

  private transformApiPlanet(apiPlanet: Planet): Partial<Planet> {
    return {
      name: apiPlanet.name,
      climate: apiPlanet.climate,
      diameter: apiPlanet.diameter,
      gravity: apiPlanet.gravity,
      population: apiPlanet.population,
      residents: apiPlanet.residents,
      terrain: apiPlanet.terrain,
      url: apiPlanet.url,
    };
  }

  private translatePlanetAttributesToSpanish(planet: Planet): Partial<Planeta> {
    return {
      nombre: planet.name,
      clima: planet.climate,
      diámetro: planet.diameter,
      gravedad: planet.gravity,
      población: planet.population,
      residentes: planet.residents,
      terreno: planet.terrain,
      url: planet.url,
    };
  }

  async getPlanetsUntilPageFromSWAPI(
    page: number,
  ): Promise<Partial<Planeta>[]> {
    try {
      const planets: Partial<Planeta>[] = [];
      const swapiBaseUrl: string =
        this.configService.get<string>('SWAPI_BASE_URL');
      let fetchedPages = 0;

      for (let i = 1; i <= page; i++) {
        this.logger.log(`Fetching planets in page ${i}...`);
        const swapiFetchUrl = `${swapiBaseUrl}/planets/?page=${i}&format=json`;

        try {
          const response = await firstValueFrom<{ results: Planet[] }>(
            this.httpService.get(swapiFetchUrl).pipe(map((res) => res.data)),
          );

          fetchedPages++;

          const transformedPlanets = response.results.map((apiPlanet) =>
            this.translatePlanetAttributesToSpanish(apiPlanet),
          );

          planets.push(...transformedPlanets);
        } catch (error) {
          this.logger.error(`Error while fetching page ${i}: ${error.message}`);
          break;
        }
      }

      this.logger.log(`Total fetched pages: ${fetchedPages}`);
      return planets;
    } catch (error) {
      this.logger.error(
        `Error while trying to fetch from SWAPI: ${error.message}`,
      );
      throw error;
    }
  }

  async getPlanetById(planetId: number): Promise<Planeta> {
    try {
      // Get planet from database first
      let planet = await this.planetRepository.findOne({
        where: { id: planetId },
      });

      if (!planet) {
        // Fetch planet information from SWAPI
        this.logger.warn(
          `Planet with ID: ${planetId} not found in database. Fetching planet from SWAPI to be saved in database...`,
        );
        const swapiBaseUrl: string =
          this.configService.get<string>('SWAPI_BASE_URL');
        const swapiFetchUrl = `${swapiBaseUrl}/planets/${planetId}?format=json`;

        const response = await firstValueFrom<Planet>(
          this.httpService.get(swapiFetchUrl).pipe(map((res) => res.data)),
        );

        // Save transformed planet in database
        const transformedPlanet: Planet = Object.assign({
          ...this.transformApiPlanet(response),
          id: Number(planetId),
        });
        planet = await this.planetRepository.save(transformedPlanet);
        this.logger.log(
          `Planet with ID: ${planetId} was fetched from SWAPI and saved in database.`,
        );
      } else {
        this.logger.log(`Planet with ID: ${planetId} was found in database.`);
      }

      return Object.assign({
        ...this.translatePlanetAttributesToSpanish(planet),
        id: planetId,
      });
    } catch (error) {
      this.logger.error(
        `Error while trying to fetch or save planet: ${error.message}`,
      );
      throw error;
    }
  }
}
