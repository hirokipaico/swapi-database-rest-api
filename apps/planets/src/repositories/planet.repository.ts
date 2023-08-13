import { Planet } from '../entities/planet.entity';
import { Repository } from 'typeorm';

export class PlanetRepository extends Repository<Planet> {}
