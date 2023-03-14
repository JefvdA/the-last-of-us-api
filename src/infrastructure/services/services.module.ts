import { Module } from '@nestjs/common';
import { CharactersService } from './characters.service';
import { EntitiesModule } from '../entities/entities.module';
import { MappersModule } from '../mappers/mappers.module';

const services: Array<any> = [CharactersService];

@Module({
  imports: [EntitiesModule, MappersModule],
  providers: services,
  exports: services,
})
export class ServicesModule {}
