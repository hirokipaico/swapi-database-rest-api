import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity()
export class Person {
  @PrimaryColumn()
  id: number;

  @Column({ type: 'varchar', length: 100 })
  name: string;

  @Column({ type: 'varchar', length: 100 })
  birth_year: string;

  @Column({ type: 'varchar', length: 100 })
  eye_color: string;

  @Column({ type: 'varchar', length: 100 })
  gender: string;

  @Column({ type: 'varchar', length: 100 })
  hair_color: string;

  @Column({ type: 'varchar', length: 100 })
  height: string;

  @Column({ type: 'varchar', length: 100 })
  homeworld: string;

  @Column({ type: 'varchar', length: 100 })
  mass: string;

  @Column({ type: 'varchar', length: 100 })
  skin_color: string;

  @Column({ type: 'timestamp' })
  created: string;

  @Column({ type: 'timestamp' })
  edited: string;

  @Column({ type: 'varchar', length: 200, nullable: true })
  url: string;
}
