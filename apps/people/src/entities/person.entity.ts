import { Entity, PrimaryColumn, Column } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Person {
  @ApiProperty({
    description: 'Person ID',
    example: 1,
  })
  @PrimaryColumn()
  id: number;

  @ApiProperty({
    description: "Person's name",
    example: 'Luke Skywalker',
  })
  @Column({ type: 'varchar', length: 100 })
  name: string;

  @ApiProperty({
    description: "Person's birth year",
    example: '19BBY',
  })
  @Column({ type: 'varchar', length: 100 })
  birth_year: string;

  @ApiProperty({
    description: "Person's eye color",
    example: 'blue',
  })
  @Column({ type: 'varchar', length: 100 })
  eye_color: string;

  @ApiProperty({
    description: "Person's gender",
    example: 'male',
  })
  @Column({ type: 'varchar', length: 100 })
  gender: string;

  @ApiProperty({
    description: "Person's hair color",
    example: 'blond',
  })
  @Column({ type: 'varchar', length: 100 })
  hair_color: string;

  @ApiProperty({
    description: "Person's height",
    example: '172',
  })
  @Column({ type: 'varchar', length: 100 })
  height: string;

  @ApiProperty({
    description: "Person's homeworld",
    example: 'https://swapi.dev/api/planets/1/',
  })
  @Column({ type: 'varchar', length: 100 })
  homeworld: string;

  @ApiProperty({
    description: "Person's mass",
    example: '77',
  })
  @Column({ type: 'varchar', length: 100 })
  mass: string;

  @ApiProperty({
    description: "Person's skin color",
    example: 'fair',
  })
  @Column({ type: 'varchar', length: 100 })
  skin_color: string;

  @ApiProperty({
    description: "Person's record creation ISO string date",
    example: '2014-12-09T13:50:51.644Z',
  })
  @Column({ type: 'timestamp' })
  created: string;

  @ApiProperty({
    description: "Person's record last edition ISO string date",
    example: '2014-12-20T21:17:56.891Z',
  })
  @Column({ type: 'timestamp' })
  edited: string;

  @ApiProperty({
    description: 'Person URL',
    example: 'https://swapi.dev/api/people/1/',
  })
  @Column({ type: 'varchar', length: 200, nullable: true })
  url: string;
}
