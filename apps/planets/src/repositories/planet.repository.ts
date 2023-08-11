import { Planet } from '../entities/planet.entity';
import { Repository } from 'typeorm';

export class PlanetRepository extends Repository<Planet> {
  async getPlanetById(planetId: number): Promise<Planet | undefined> {
    try {
      return await this.findOne({ where: { id: planetId } });
    } catch (error) {
      throw error;
    }
  }
}
