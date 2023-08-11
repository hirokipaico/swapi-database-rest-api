import { IsInt, Min } from 'class-validator';
import { Transform } from 'class-transformer';

export class PageQueryDto {
  @Transform(({ value }) => parseInt(value), { toClassOnly: true })
  @IsInt({ message: `'page' query value must be a positive integer` })
  @Min(1, { message: `'page' query value must not be less than 1` })
  page: number;
}
