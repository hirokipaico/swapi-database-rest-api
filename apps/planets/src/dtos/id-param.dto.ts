import { IsInt, Min } from 'class-validator';
import { Transform } from 'class-transformer';

export class IdParamDto {
  @Transform(({ value }) => parseInt(value), { toClassOnly: true })
  @IsInt({ message: `'planetId' must be an integer` })
  @Min(1, { message: `'planetId' must be greater than or equal to 1` })
  planetId: number;
}
