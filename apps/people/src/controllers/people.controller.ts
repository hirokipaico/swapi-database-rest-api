import { Controller, Get } from '@nestjs/common';
import { PeopleService } from '../services/people.service';

@Controller()
export class PeopleController {
  constructor(private readonly peopleService: PeopleService) {}

  @Get()
  getHello(): string {
    return this.peopleService.getHello();
  }
}
