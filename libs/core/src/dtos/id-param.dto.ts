import { IsInt, Min } from 'class-validator';
import { Transform } from 'class-transformer';

export class IdParamDto {
  @Transform(({ value }) => parseInt(value), { toClassOnly: true })
  @IsInt({
    message: `'id' must be an integer`,
  })
  @Min(1, {
    message: `'id' must be greater than or equal to 1`,
  })
  id: number;
}
