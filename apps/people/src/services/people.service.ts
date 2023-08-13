import { Injectable, Logger } from '@nestjs/common';
import { map, firstValueFrom, last } from 'rxjs';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { Person } from '../entities/person.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { PeopleRepository } from '../repositories/person.repository';

@Injectable()
export class PeopleService {
  private readonly logger = new Logger(PeopleService.name);

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
    @InjectRepository(Person)
    private readonly peopleRepository: PeopleRepository,
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
      let person = await this.peopleRepository.findOne({
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
        person = await this.peopleRepository.save({
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

  async getNextAvailableId(): Promise<number> {
    try {
      this.logger.log('Generating next available ID...');
      const queryBuilder = this.peopleRepository.createQueryBuilder('person');
      const lastPerson = await queryBuilder
        .orderBy('person.id', 'DESC')
        .getOne();

      const lastId = Math.max(lastPerson?.id || 0, 10000);
      const nextId = lastId + 1;
      this.logger.log(`Completed. Next available ID: ${nextId}`);
      return nextId;
    } catch (error) {
      this.logger.error(
        `Error while generating available ID: ${error.message}`,
      );
      throw error;
    }
  }

  async savePerson(person: Person): Promise<Person> {
    try {
      this.logger.log(`Saving person with ID: ${person.id} in database...`);
      const savedPerson = await this.peopleRepository.save(person);

      return savedPerson;
    } catch (error) {
      this.logger.error(`Error while trying to save person: ${error.message}`);
      throw error;
    }
  }
}
