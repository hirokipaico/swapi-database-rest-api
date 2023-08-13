import { Test, TestingModule } from '@nestjs/testing';
import { PeopleController } from './people.controller';
import { PeopleService } from '../services/people.service';
import { Person } from '../entities/person.entity';
import {
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import { InputPersonDto } from '../dtos/person.dto';

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

      const result = await peopleController.getAllPeople(1);
      expect(result).toEqual(mockPeople);
    });

    it('should throw a BadRequestException if page query is not a positive integer', async () => {
      try {
        await peopleController.getAllPeople(-2);
      } catch (error) {
        expect(error).toBeInstanceOf(BadRequestException);
      }
    });

    it('should throw an InternalServerErrorException if service throws an error', async () => {
      jest
        .spyOn(peopleService, 'getAllPeopleFromSWAPI')
        .mockRejectedValue(new InternalServerErrorException());

      await expect(peopleController.getAllPeople(1)).rejects.toThrow(
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

      const result = await peopleController.getPersonById(1);
      expect(result).toEqual(mockPerson);
    });

    it(`should throw a BadRequestException if id param is not a positive integer`, async () => {
      try {
        await peopleController.getPersonById(-5);
      } catch (error) {
        expect(error).toBeInstanceOf(BadRequestException);
      }
    });

    it('should throw an InternalServerErrorException if service throws an error', async () => {
      jest
        .spyOn(peopleService, 'getPersonById')
        .mockRejectedValue(new InternalServerErrorException());

      await expect(peopleController.getPersonById(1)).rejects.toThrow(
        InternalServerErrorException,
      );
    });
  });

  describe('savePerson', () => {
    it('should save a person and return the saved person', async () => {
      const inputDto: InputPersonDto = {
        name: 'Luke Skywalker',
        birth_year: '19BBY',
        eye_color: 'blue',
        gender: 'male',
        hair_color: 'blond',
        height: '172',
        homeworld: 'https://swapi.dev/api/planets/1/',
        mass: '77',
        skin_color: 'fair',
      };

      const nextId = await peopleService.getNextAvailableId();
      const currentDate = new Date().toISOString();
      const expectedSavedPerson: Person = {
        id: nextId,
        created: currentDate,
        edited: currentDate,
        url: null,
        ...inputDto,
      };

      jest
        .spyOn(peopleService, 'savePerson')
        .mockResolvedValue(expectedSavedPerson);

      const result = await peopleController.postPerson(inputDto);
      expect(result).toEqual({
        message: 'Person information saved successfully.',
        data: expectedSavedPerson,
      });
    });

    it('should throw InternalServerErrorException on service error', async () => {
      const inputDto: InputPersonDto = {
        name: 'Luke Skywalker',
        birth_year: '19BBY',
        eye_color: 'blue',
        gender: 'male',
        hair_color: 'blond',
        height: '172',
        homeworld: 'https://swapi.dev/api/planets/1/',
        mass: '77',
        skin_color: 'fair',
      };

      jest
        .spyOn(peopleService, 'savePerson')
        .mockRejectedValue(new InternalServerErrorException());

      await expect(peopleController.postPerson(inputDto)).rejects.toThrow(
        InternalServerErrorException,
      );
    });
  });
});
