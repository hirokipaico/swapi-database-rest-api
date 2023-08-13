import { IsInt, Min } from 'class-validator';
import { Transform } from 'class-transformer';

export class PageQueryDto {
  @Transform(({ value }) => parseInt(value), { toClassOnly: true })
  @IsInt({ message: `'page' query value must be an integer` })
  @Min(1, { message: `'page' query value must be greater than or equal to 1` })
  page: number;
}
