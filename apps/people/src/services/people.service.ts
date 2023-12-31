import { Injectable, Logger } from '@nestjs/common';
import { map, firstValueFrom } from 'rxjs';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { Person } from '../entities/person.entity';
import { Persona } from '../interfaces/persona.interface';
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

  private transformApiPerson(apiPerson: Person): Partial<Person> {
    return {
      name: apiPerson.name,
      height: apiPerson.height,
      mass: apiPerson.mass,
      hair_color: apiPerson.hair_color,
      skin_color: apiPerson.skin_color,
      eye_color: apiPerson.eye_color,
      birth_year: apiPerson.birth_year,
      gender: apiPerson.gender,
      homeworld: apiPerson.homeworld,
      created: apiPerson.created,
      edited: apiPerson.edited,
      url: apiPerson.url,
    };
  }

  private translatePersonAttributesToSpanish(person: Person): Partial<Persona> {
    return {
      nombre: person.name,
      altura: person.height,
      masa: person.mass,
      color_de_pelo: person.hair_color,
      color_de_piel: person.skin_color,
      color_de_ojos: person.eye_color,
      fecha_de_nacimiento: person.birth_year,
      genero: person.gender,
      mundo_natal: person.homeworld,
      creado: person.created,
      editado: person.edited,
      url: person.url,
    };
  }

  async getAllPeopleFromSWAPI(page: number): Promise<Partial<Persona>[]> {
    try {
      const people: Partial<Persona>[] = [];
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

          const transformedPeople: Partial<Persona>[] = response.map(
            (apiPerson) => this.translatePersonAttributesToSpanish(apiPerson),
          );

          people.push(...transformedPeople);
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

  async getPersonById(personId: number): Promise<Persona> {
    try {
      let person = await this.peopleRepository.findOne({
        where: { id: personId },
      });

      if (!person) {
        // Fetch planet information from SWAPI
        this.logger.warn(
          `Person with ID: ${personId} not found in database. Fetching person from SWAPI to be saved in database...`,
        );
        const swapiBaseUrl: string =
          this.configService.get<string>('SWAPI_BASE_URL');
        const swapiFetchUrl = `${swapiBaseUrl}/people/${personId}?format=json`;

        const response = await firstValueFrom<Person>(
          this.httpService.get(swapiFetchUrl).pipe(map((res) => res.data)),
        );

        person = await this.peopleRepository.save({
          ...this.transformApiPerson(response),
          id: personId,
        });
        this.logger.log(
          `Person with ID: ${personId} was fetched from SWAPI and saved in the database.`,
        );
      } else {
        this.logger.log(
          `Person with ID: ${personId} was found in the database.`,
        );
      }

      return Object.assign({
        ...this.translatePersonAttributesToSpanish(person),
        id: personId,
      });
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

  async savePerson(person: Person): Promise<Persona> {
    try {
      this.logger.log(`Saving person with ID: ${person.id} in database...`);
      const savedPerson = await this.peopleRepository.save(person);

      return Object.assign({
        ...this.translatePersonAttributesToSpanish(savedPerson),
        id: person.id,
      });
    } catch (error) {
      this.logger.error(`Error while trying to save person: ${error.message}`);
      throw error;
    }
  }
}
