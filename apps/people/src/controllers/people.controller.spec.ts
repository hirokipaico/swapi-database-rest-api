import { Test, TestingModule } from '@nestjs/testing';
import { PeopleController } from './people.controller';
import { PeopleService } from '../services/people.service';
import { Person } from '../entities/person.entity';
import { InternalServerErrorException } from '@nestjs/common';

describe('PeopleController', () => {
  let peopleController: PeopleController;
  let peopleService: PeopleService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PeopleController],
      providers: [
        {
          provide: PeopleService,
          useValue: {
            getAllPeopleFromSWAPI: jest.fn(),
            getPersonById: jest.fn(),
            getNextAvailableId: jest.fn(),
            savePerson: jest.fn(),
          },
        },
      ],
    }).compile();

    peopleController = module.get<PeopleController>(PeopleController);
    peopleService = module.get<PeopleService>(PeopleService);
  });

  describe('getAllPeople', () => {
    it('should return an array of people', async () => {
      const mockPeople: Person[] = [];

      jest
        .spyOn(peopleService, 'getAllPeopleFromSWAPI')
        .mockResolvedValue(mockPeople);

      const result = await peopleController.getAllPeople({ page: 1 });
      expect(result).toEqual(mockPeople);
    });

    it('should throw an InternalServerErrorException if service throws an error', async () => {
      jest
        .spyOn(peopleService, 'getAllPeopleFromSWAPI')
        .mockRejectedValue(new InternalServerErrorException());

      await expect(peopleController.getAllPeople({ page: 1 })).rejects.toThrow(
        InternalServerErrorException,
      );
    });
  });

  describe('getPersonById', () => {
    it('should return a specific person with ID 1', async () => {
      const mockPerson: Person = {
        name: 'Luke Skywalker',
        height: '172',
        mass: '77',
        hair_color: 'blond',
        skin_color: 'fair',
        eye_color: 'blue',
        birth_year: '19BBY',
        gender: 'male',
        homeworld: 'https://swapi.dev/api/planets/1/',
        created: '2014-12-09T13:50:51.644000Z',
        edited: '2014-12-20T21:17:56.891000Z',
        url: 'https://swapi.dev/api/people/1/',
        id: 1,
      };

      jest.spyOn(peopleService, 'getPersonById').mockResolvedValue(mockPerson);

      const result = await peopleController.getPersonById({ id: 1 });
      expect(result).toEqual(mockPerson);
    });

    it('should throw an InternalServerErrorException if service throws an error', async () => {
      jest
        .spyOn(peopleService, 'getPersonById')
        .mockRejectedValue(new InternalServerErrorException());

      await expect(peopleController.getPersonById({ id: 1 })).rejects.toThrow(
        InternalServerErrorException,
      );
    });
  });
});
