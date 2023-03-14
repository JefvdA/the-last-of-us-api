import { Module } from '@nestjs/common';
import { CharactersService } from './characters.service';
import { EntitiesModule } from '../entities/entities.module';

const services: Array<any> = [CharactersService];

@Module({
  imports: [EntitiesModule],
  providers: services,
  exports: services,
})
export class ServicesModule {}
