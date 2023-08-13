import { IsString } from 'class-validator';

export class InputPersonDto {
  @IsString()
  name: string;

  @IsString()
  birth_year: string;

  @IsString()
  eye_color: string;

  @IsString()
  gender: string;

  @IsString()
  hair_color: string;

  @IsString()
  height: string;

  @IsString()
  homeworld: string;

  @IsString()
  mass: string;

  @IsString()
  skin_color: string;
}
