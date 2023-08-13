import { DocumentBuilder } from '@nestjs/swagger';

export const PeopleSwaggerConfig = new DocumentBuilder()
  .setTitle('Star Wars People API')
  .setDescription('All the star wars people available through all the films!')
  .addTag('people', 'Endpoints for viewing people')
  .setVersion('1.0')
  .build();
