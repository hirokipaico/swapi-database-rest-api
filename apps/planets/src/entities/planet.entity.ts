import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Planet {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100, nullable: false })
  name: string;

  @Column({ type: 'int', nullable: true })
  rotation_period: number;

  @Column({ type: 'int', nullable: true })
  orbital_period: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  diameter: number;

  @Column({ length: 100, nullable: true })
  climate: string;

  @Column({ length: 100, nullable: true })
  gravity: string;

  @Column({ length: 100, nullable: true })
  terrain: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  surface_water: number;

  @Column({ length: 20, nullable: true })
  population: string;

  @Column({ type: 'simple-array', nullable: true })
  residents: string[];

  @Column({ type: 'simple-array', nullable: true })
  films: string[];

  @Column({ type: 'timestamp', nullable: true })
  created: Date;

  @Column({ type: 'timestamp', nullable: true })
  edited: Date;

  @Column({ length: 200, nullable: true })
  url: string;
}
