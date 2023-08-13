import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity()
export class Planet {
  @PrimaryColumn()
  id: number;

  @Column({ type: 'varchar', length: 100, nullable: false })
  name: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  climate: string;

  @Column({ type: 'varchar', length: 10, nullable: true })
  diameter: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  gravity: string;

  @Column({ type: 'varchar', length: 20, nullable: true })
  population: string;

  @Column({ type: 'simple-array', nullable: true })
  residents: string[];

  @Column({ type: 'varchar', length: 100, nullable: true })
  terrain: string;

  @Column({ type: 'varchar', length: 200, nullable: true })
  url: string;
}
