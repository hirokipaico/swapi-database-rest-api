import { IsInt, Min } from 'class-validator';
import { Transform } from 'class-transformer';

export class IdParamDto {
  @Transform(({ value }) => parseInt(value), { toClassOnly: true })
  @IsInt({
    message: `${'planetId' || 'personId'} must be an integer`,
  })
  @Min(1, {
    message: `${'planetId' || 'personId'} must be greater than or equal to 1`,
  })
  planetId: number;
}
