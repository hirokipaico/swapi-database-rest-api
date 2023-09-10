import { Test, TestingModule } from '@nestjs/testing';
import { PlanetController } from './planet.controller';
import { PlanetService } from '../services/planet.service';

import {
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import { Planeta } from '../interfaces/planeta.interface';

describe('PlanetController', () => {
  let planetController: PlanetController;
  let planetService: PlanetService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PlanetController],
      providers: [
        {
          provide: PlanetService,
          useValue: {
            getPlanetsUntilPageFromSWAPI: jest.fn(),
            getPlanetById: jest.fn(),
          },
        },
      ],
    }).compile();

    planetController = module.get<PlanetController>(PlanetController);
    planetService = module.get<PlanetService>(PlanetService);
  });

  describe('getAllPlanets', () => {
    it('should return an array of planets', async () => {
      const mockPlanets: Planeta[] = [
        {
          id: null,
          nombre: 'Tatooine',
          clima: 'arid',
          diámetro: '10465',
          gravedad: '1 standard',
          población: '200000',
          residentes: [
            'https://swapi.dev/api/people/1/',
            'https://swapi.dev/api/people/2/',
            'https://swapi.dev/api/people/4/',
            'https://swapi.dev/api/people/6/',
            'https://swapi.dev/api/people/7/',
            'https://swapi.dev/api/people/8/',
            'https://swapi.dev/api/people/9/',
            'https://swapi.dev/api/people/11/',
            'https://swapi.dev/api/people/43/',
            'https://swapi.dev/api/people/62/',
          ],
          terreno: 'desert',
          url: 'https://swapi.dev/api/planets/1/',
        },
        {
          id: null,
          nombre: 'Yavin IV',
          clima: 'temperate, tropical',
          diámetro: '10200',
          gravedad: '1 standard',
          población: '1000',
          residentes: [],
          terreno: 'jungle, rainforests',
          url: 'https://swapi.dev/api/planets/3/',
        },
      ];

      jest
        .spyOn(planetService, 'getPlanetsUntilPageFromSWAPI')
        .mockResolvedValue(mockPlanets);

      const result = await planetController.getAllPlanets(1);

      const expectedNames = mockPlanets.map((mockPlanet) => mockPlanet.nombre);
      const actualNames = result.map((resultPlanet) => resultPlanet.nombre);

      // Check if each expected name is present in the actual names
      expectedNames.forEach((expectedName) => {
        expect(actualNames).toContain(expectedName);
      });
    });

    it('should throw a BadRequestException if page query is not a positive integer', async () => {
      try {
        await planetController.getAllPlanets(-2);
      } catch (error) {
        expect(error).toBeInstanceOf(BadRequestException);
      }
    });

    it('should throw an InternalServerErrorException if service throws an error', async () => {
      jest
        .spyOn(planetService, 'getPlanetsUntilPageFromSWAPI')
        .mockRejectedValue(new InternalServerErrorException());

      await expect(planetController.getAllPlanets(2)).rejects.toThrow(
        InternalServerErrorException,
      );
    });
  });

  describe('getPlanetById', () => {
    it('should return specific planet based on ID 2', async () => {
      const mockPlanet: Planeta = {
        nombre: 'Alderaan',
        diámetro: '12500',
        clima: 'temperate',
        gravedad: '1 standard',
        terreno: 'grasslands, mountains',
        población: '2000000000',
        residentes: [
          'https://swapi.dev/api/people/5/',
          'https://swapi.dev/api/people/68/',
          'https://swapi.dev/api/people/81/',
        ],
        url: 'https://swapi.dev/api/planets/2/',
        id: 2,
      };
      jest.spyOn(planetService, 'getPlanetById').mockResolvedValue(mockPlanet);
      const result = await planetController.getPlanetById(2);
      expect(result).toBe(mockPlanet);
    });

    it(`should throw a BadRequestException if id param is not a positive integer`, async () => {
      try {
        await planetController.getPlanetById(-5);
      } catch (error) {
        expect(error).toBeInstanceOf(BadRequestException);
      }
    });

    it(`shoud throw an InternalServerErrorException if service throws an error`, async () => {
      jest
        .spyOn(planetService, 'getPlanetById')
        .mockRejectedValue(new InternalServerErrorException());

      await expect(planetController.getPlanetById(10)).rejects.toThrow(
        InternalServerErrorException,
      );
    });
  });
});
