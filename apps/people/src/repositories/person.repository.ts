import { Person } from '../entities/person.entity';
import { Repository } from 'typeorm';

export class PersonRepository extends Repository<Person> {}
