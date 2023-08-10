import { Injectable } from '@nestjs/common';

@Injectable()
export class PeopleService {
  getHello(): string {
    return 'Hello people!';
  }
}
