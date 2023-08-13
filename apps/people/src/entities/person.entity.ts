import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity()
export class Person {
  @PrimaryColumn()
  id: number;

  @Column({ type: 'varchar', length: 100, nullable: false })
  name: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  birth_year: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  eye_color: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  gender: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  hair_color: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  height: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  homeworld: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  mass: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  skin_color: string;

  @Column({ type: 'timestamp', nullable: true })
  created: Date;

  @Column({ type: 'timestamp', nullable: true })
  edited: Date;

  @Column({ type: 'varchar', length: 200, nullable: true })
  url: string;
}
