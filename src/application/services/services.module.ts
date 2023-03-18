import { Module } from '@nestjs/common';
import { CharacterService } from './character.service';
import { EntitiesModule } from '../../infrastructure/entities/entities.module';
import { MappersModule } from '../../infrastructure/mappers/mappers.module';

const services: Array<any> = [CharacterService];

@Module({
  imports: [EntitiesModule, MappersModule],
  providers: services,
  exports: services,
})
export class ServicesModule {}
