import { Injectable, Logger } from '@nestjs/common';
import { map, firstValueFrom } from 'rxjs';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { Person } from '../entities/person.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { PersonRepository } from '../repositories/person.repository';

@Injectable()
export class PeopleService {
  private readonly logger = new Logger(PeopleService.name);

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
    @InjectRepository(Person)
    private readonly personRepository: PersonRepository,
  ) {}

  async getAllPeopleFromSWAPI(page: number): Promise<Person[]> {
    try {
      const people: Person[] = [];
      const swapiBaseUrl: string =
        this.configService.get<string>('SWAPI_BASE_URL');
      let fetchedPages = 0;

      for (let i = 1; i <= page; i++) {
        this.logger.log(`Fetching people in page ${i}...`);
        const swapiFetchUrl = `${swapiBaseUrl}/people/?page=${i}&format=json`;
        try {
          const response = await firstValueFrom<Person[]>(
            this.httpService
              .get(swapiFetchUrl)
              .pipe(map((res) => res.data?.results)),
          );

          fetchedPages++;

          for (let j = 0; j < response.length; j++) {
            people.push(response[j]);
          }
        } catch (error) {
          this.logger.error(`Error while fetching page ${i}: ${error.message}`);
          break;
        }
      }

      this.logger.log(`Total fetched pages: ${fetchedPages}`);
      return people;
    } catch (error) {
      this.logger.error(
        `Error while trying to fetch from SWAPI: ${error.message}`,
      );
      throw error;
    }
  }

  async getPersonById(personId: number): Promise<Person> {
    try {
      // Get person from database first
      let person = await this.personRepository.findOne({
        where: { id: personId },
      });

      if (!person) {
        // Fetch person information from SWAPI
        this.logger.error(
          `Person with ID: ${personId} not found in database. Fetching person from SWAPI to be saved in database...`,
        );
        const swapiBaseUrl: string =
          this.configService.get<string>('SWAPI_BASE_URL');
        const swapiFetchUrl = `${swapiBaseUrl}/people/${personId}?format=json`;

        const response = await firstValueFrom<Person>(
          this.httpService.get(swapiFetchUrl).pipe(map((res) => res.data)),
        );

        // Save fetched person in database
        person = await this.personRepository.save({
          ...response,
          id: personId,
        });
        this.logger.log(
          `Person with ID: ${personId} was fetched from SWAPI and saved in database.`,
        );
      } else {
        this.logger.log(`Person with ID: ${personId} was found in database.`);
      }

      return person;
    } catch (error) {
      this.logger.error(
        `Error while trying to fetch or save person: ${error.message}`,
      );
      throw error;
    }
  }
}
