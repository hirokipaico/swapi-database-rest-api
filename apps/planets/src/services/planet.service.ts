import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { firstValueFrom, map } from 'rxjs';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { PlanetRepository } from '../repositories/planet.repository';
import { Planet } from '../entities/planet.entity';

@Injectable()
export class PlanetService {
  private readonly logger = new Logger(PlanetService.name);

  constructor(
    private readonly configService: ConfigService,
    private readonly httpService: HttpService,
    @InjectRepository(Planet)
    private readonly planetRepository: PlanetRepository,
  ) {}

  async getPlanetsUntilPageFromSWAPI(page: number): Promise<Planet[]> {
    try {
      const planets: Planet[] = [];
      const swapiBaseUrl: string =
        this.configService.get<string>('SWAPI_BASE_URL');
      let fetchedPages = 0;

      for (let i = 1; i <= page; i++) {
        this.logger.log(`Fetching planets in page ${i}...`);
        const swapiFetchUrl = `${swapiBaseUrl}/planets/?page=${i}&format=json`;
        try {
          const response = await firstValueFrom<Planet[]>(
            this.httpService
              .get(swapiFetchUrl)
              .pipe(map((res) => res.data?.results)),
          );

          fetchedPages++;

          for (let j = 0; j < response.length; j++) {
            planets.push(response[j]);
          }
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

  async getPlanetById(id: number): Promise<Planet> {
    try {
      // Get planet from database first
      let planet = await this.planetRepository.findOne({ where: { id: id } });

      if (!planet) {
        // Fetch planet information from SWAPI
        this.logger.error(
          `Planet with ID: ${id} not found in database. Fetching planet from SWAPI to be saved in database...`,
        );
        const swapiBaseUrl: string =
          this.configService.get<string>('SWAPI_BASE_URL');
        const swapiFetchUrl = `${swapiBaseUrl}/planets/${id}?format=json`;

        const response = await firstValueFrom<Planet>(
          this.httpService.get(swapiFetchUrl).pipe(map((res) => res.data)),
        );

        // Save fetched planet in database
        planet = await this.planetRepository.save({ ...response, id: id });
        this.logger.log(
          `Planet wit ID: ${id} was fetched from SWAPI and saved in database.`,
        );
      } else {
        this.logger.log(`Planet with ID: ${id} was found in database.`);
      }

      return planet;
    } catch (error) {
      this.logger.error(
        `Error while trying to fetch or save planet: ${error.message}`,
      );
      throw error;
    }
  }
}
