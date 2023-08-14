import {
  PipeTransform,
  Injectable,
  BadRequestException,
  ArgumentMetadata,
} from '@nestjs/common';

@Injectable()
export class PositiveIntPipe implements PipeTransform<number, number> {
  transform(value: number, metadata: ArgumentMetadata): number {
    if (typeof value !== 'number') {
      throw new BadRequestException(
        `${
          metadata.type.charAt(0).toUpperCase() + metadata.type.slice(1)
        } element '${metadata.data}' must be an integer.`,
      );
    }
    if (!value) {
      throw new BadRequestException(
        `${
          metadata.type.charAt(0).toUpperCase() + metadata.type.slice(1)
        } element '${metadata.data}' must not be empty.`,
      );
    }
    if (value < 1) {
      throw new BadRequestException(
        `${
          metadata.type.charAt(0).toUpperCase() + metadata.type.slice(1)
        } element '${metadata.data}' must be higher than 0.`,
      );
    }
    return value;
  }
}
