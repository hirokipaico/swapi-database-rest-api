import {
  PipeTransform,
  Injectable,
  BadRequestException,
  ArgumentMetadata,
} from '@nestjs/common';

@Injectable()
export class PositiveIntPipe implements PipeTransform<number, number> {
  transform(value: number, metadata: ArgumentMetadata): number {
    if (!value || isNaN(+value) || +value < 1 || !Number.isInteger(+value)) {
      throw new BadRequestException(
        `${
          metadata.type.charAt(0).toUpperCase() + metadata.type.slice(1)
        } element '${metadata.data}' must be a non-empty positive integer.`,
      );
    }
    return +value;
  }
}
