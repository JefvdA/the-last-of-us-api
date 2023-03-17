import { Module } from '@nestjs/common';
import { CharacterService } from './character.service';
import { EntitiesModule } from '../entities/entities.module';
import { MappersModule } from '../mappers/mappers.module';

const services: Array<any> = [CharacterService];

@Module({
  imports: [EntitiesModule, MappersModule],
  providers: services,
  exports: services,
})
export class ServicesModule {}
