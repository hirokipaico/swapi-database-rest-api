import { DocumentBuilder } from '@nestjs/swagger';

export const PlanetSwaggerConfig = new DocumentBuilder()
  .setTitle('Star Wars Planets API')
  .setDescription('All the star wars planets available through all the films!')
  .addTag('planets', 'Endpoints for viewing planets')
  .setVersion('1.0')
  .build();
