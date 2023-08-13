import { Person } from '../entities/person.entity';
import { Repository } from 'typeorm';

export class PeopleRepository extends Repository<Person> {}
