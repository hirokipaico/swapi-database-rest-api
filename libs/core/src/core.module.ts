import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from 'libs/config/typeorm.config';

@Module({
  imports: [TypeOrmModule.forRootAsync(typeOrmConfig)],
  providers: [],
  exports: [],
})
export class CoreModule {}
