import { Module } from '@nestjs/common';
import { CharactersResolver } from './characters.resolver';
import { ServicesModule } from '../../infrastructure/services/services.module';
import {MappersModule} from "../mappers/mappers.module";

const resolvers: Array<any> = [CharactersResolver];

@Module({
  imports: [ServicesModule, MappersModule],
  providers: resolvers,
  exports: resolvers,
})
export class ResolversModule {}
