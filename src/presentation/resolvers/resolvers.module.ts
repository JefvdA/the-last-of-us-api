import { Module } from '@nestjs/common';
import CharacterResolver from './character.resolver';
import MappersModule from '../mappers/mappers.module';
import UseCasesModule from '../../application/use-cases/use-cases.module';
import { APP_FILTER } from '@nestjs/core';
import GraphqlExceptionFilterMiddleware from '../middleware/graphql-exception-filter.middleware';

const resolvers: Array<any> = [CharacterResolver];

@Module({
  imports: [UseCasesModule, MappersModule],
  providers: resolvers.concat([
    {
      provide: APP_FILTER,
      useClass: GraphqlExceptionFilterMiddleware,
    },
  ]),
  exports: resolvers,
})
export default class ResolversModule {}
