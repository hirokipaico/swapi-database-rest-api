import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity()
export class Planet {
  @PrimaryColumn()
  id: number;

  @Column({ type: 'varchar', length: 100 })
  name: string;

  @Column({ type: 'varchar', length: 100 })
  climate: string;

  @Column({ type: 'varchar', length: 10 })
  diameter: string;

  @Column({ type: 'varchar', length: 100 })
  gravity: string;

  @Column({ type: 'varchar', length: 20 })
  population: string;

  @Column({ type: 'simple-array' })
  residents: string[];

  @Column({ type: 'varchar', length: 100 })
  terrain: string;

  @Column({ type: 'varchar', length: 200 })
  url: string;
}
