import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Person {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100, nullable: false })
  name: string;

  @Column({ length: 10, nullable: true })
  height: string;

  @Column({ length: 10, nullable: true })
  mass: string;

  @Column({ length: 20, nullable: true })
  hair_color: string;

  @Column({ length: 20, nullable: true })
  skin_color: string;

  @Column({ length: 20, nullable: true })
  eye_color: string;

  @Column({ length: 10, nullable: true })
  birth_year: string;

  @Column({ length: 10, nullable: true })
  gender: string;

  @Column({ length: 200, nullable: true })
  homeworld: string;

  @Column({ type: 'simple-array', nullable: true })
  films: string[];

  @Column({ type: 'simple-array', nullable: true })
  species: string[];

  @Column({ type: 'simple-array', nullable: true })
  vehicles: string[];

  @Column({ type: 'simple-array', nullable: true })
  starships: string[];

  @Column({ type: 'timestamp', nullable: true })
  created: Date;

  @Column({ type: 'timestamp', nullable: true })
  edited: Date;

  @Column({ length: 200, nullable: true })
  url: string;
}
