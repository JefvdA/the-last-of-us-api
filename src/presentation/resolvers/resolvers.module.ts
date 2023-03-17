import { Module } from '@nestjs/common';
import { CharacterResolver } from './character.resolver';
import { ServicesModule } from '../../infrastructure/services/services.module';
import { MappersModule } from '../mappers/mappers.module';

const resolvers: Array<any> = [CharacterResolver];

@Module({
  imports: [ServicesModule, MappersModule],
  providers: resolvers,
  exports: resolvers,
})
export class ResolversModule {}
