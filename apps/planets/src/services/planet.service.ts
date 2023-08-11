import { Injectable, Logger } from '@nestjs/common';
import { firstValueFrom, map } from 'rxjs';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { Planet } from '../entities/planet.entity';

@Injectable()
export class PlanetService {
  private readonly logger = new Logger(PlanetService.name);

  constructor(
    private readonly configService: ConfigService,
    private readonly httpService: HttpService,
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
              .pipe(map((response) => response.data?.results)),
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
    } catch (error: unknown) {
      throw error;
    }
  }
}
