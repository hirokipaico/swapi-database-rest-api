import { IsInt, Min } from 'class-validator';
import { Transform } from 'class-transformer';

export class IdParamDto {
  @Transform(({ value }) => parseInt(value), { toClassOnly: true })
  @IsInt({ message: `'id' param value must be a positive integer` })
  @Min(1, { message: `'id' param value must not be less than 1` })
  id: number;
}
