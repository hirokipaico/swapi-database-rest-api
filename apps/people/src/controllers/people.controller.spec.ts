import { Test, TestingModule } from '@nestjs/testing';
import { PeopleController } from './people.controller';
import { PeopleService } from '../services/people.service';

describe('PeopleController', () => {
  let peopleController: PeopleController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [PeopleController],
      providers: [PeopleService],
    }).compile();

    peopleController = app.get<PeopleController>(PeopleController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(peopleController.getHello()).toBe('Hello World!');
    });
  });
});
