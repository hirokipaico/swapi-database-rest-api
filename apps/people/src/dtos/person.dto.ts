import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class InputPersonDto {
  @ApiProperty({
    description: "Person's name",
    example: 'Luke Skywalker',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: "Person's birth year",
    example: '19BBY',
  })
  @IsString()
  @IsNotEmpty()
  birth_year: string;

  @ApiProperty({
    description: "Person's eye color",
    example: 'blue',
  })
  @IsNotEmpty()
  @IsString()
  eye_color: string;

  @ApiProperty({
    description: "Person's gender",
    example: 'male',
  })
  @IsNotEmpty()
  @IsString()
  gender: string;

  @ApiProperty({
    description: "Person's hair color",
    example: 'blond',
  })
  @IsNotEmpty()
  @IsString()
  hair_color: string;

  @ApiProperty({
    description: "Person's height",
    example: '172',
  })
  @IsNotEmpty()
  @IsString()
  height: string;

  @ApiProperty({
    description: "Person's homeworld",
    example: 'https://swapi.dev/api/planets/1/',
  })
  @IsNotEmpty()
  @IsString()
  homeworld: string;

  @ApiProperty({
    description: "Person's mass",
    example: '77',
  })
  @IsNotEmpty()
  @IsString()
  mass: string;

  @ApiProperty({
    description: "Person's skin color",
    example: 'fair',
  })
  @IsNotEmpty()
  @IsString()
  skin_color: string;
}
