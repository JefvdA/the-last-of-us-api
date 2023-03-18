import { Module } from '@nestjs/common';
import { CharacterResolver } from './character.resolver';
import { MappersModule } from '../mappers/mappers.module';
import {UseCasesModule} from "../../application/use-cases/use-cases.module";

const resolvers: Array<any> = [CharacterResolver];

@Module({
  imports: [UseCasesModule, MappersModule],
  providers: resolvers,
  exports: resolvers,
})
export class ResolversModule {}
