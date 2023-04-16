import { Module } from '@nestjs/common';
import { CharactersModule } from './characters/characters.module';
import InfrastructureModule from './infrastructure/infrastructure.module';
import GraphqlModule from './graphql/graphql.module';

@Module({
  imports: [InfrastructureModule, GraphqlModule, CharactersModule],
})
export default class AppModule {}
