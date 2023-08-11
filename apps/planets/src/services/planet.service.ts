import { Injectable, Logger } from '@nestjs/common';
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
      // Fetch planet information from database
      const planet = await this.planetRepository.getPlanetById(id);
      if (planet) {
        this.logger.log(`Planet found in database. ID: ${id}`);
        return planet;
      }

      // If the planet is not found on DB or empty object was returned from db then fetch it
      this.logger.debug(`Planet with ID ${id} was not found in database.`);
      const swapiBaseUrl: string =
        this.configService.get<string>('SWAPI_BASE_URL');
      const swapiFetchUrl = `${swapiBaseUrl}/planets/${id}?format=json`;

      this.logger.log(`Fetching planets with ID ${id}...`);
      const response = await firstValueFrom<Planet>(
        this.httpService.get(swapiFetchUrl).pipe(map((res) => res.data)),
      );

      // Save fetched planet in database
      await this.planetRepository.save(response);
      this.logger.log(`Planet fetched from SWAPI and saved. ID: ${id}`);
      return response;
    } catch (error) {
      this.logger.error(`Error while trying to fetch planet: ${error.message}`);
      throw error;
    }
  }
}
