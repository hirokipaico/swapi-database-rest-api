import { Entity, PrimaryColumn, Column } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Planet {
  @ApiProperty({
    description: 'Planet ID',
    example: 1,
  })
  @PrimaryColumn()
  id: number;

  @ApiProperty({
    description: "Planet's name",
    example: 'Tatooine',
  })
  @Column({ type: 'varchar', length: 100 })
  name: string;

  @ApiProperty({
    description: "Planet's climate",
    example: 'arid',
  })
  @Column({ type: 'varchar', length: 100 })
  climate: string;

  @ApiProperty({
    description: "Planet's diameter",
    example: '10465',
  })
  @Column({ type: 'varchar', length: 10 })
  diameter: string;

  @ApiProperty({
    description: "Planet's gravity",
    example: '1 standard',
  })
  @Column({ type: 'varchar', length: 100 })
  gravity: string;

  @ApiProperty({
    description: "Planet's population",
    example: '200000',
  })
  @Column({ type: 'varchar', length: 20 })
  population: string;

  @ApiProperty({
    description: "Planet's residents",
    isArray: true,
    example: [
      'https://swapi.dev/api/people/1/',
      'https://swapi.dev/api/people/2/',
    ],
  })
  @Column({ type: 'simple-array' })
  residents: string[];

  @ApiProperty({
    description: "Planet's terrain",
    example: 'desert',
  })
  @Column({ type: 'varchar', length: 100 })
  terrain: string;

  @ApiProperty({
    description: 'Planet URL',
    example: 'https://swapi.dev/api/planets/1/',
  })
  @Column({ type: 'varchar', length: 200 })
  url: string;
}
