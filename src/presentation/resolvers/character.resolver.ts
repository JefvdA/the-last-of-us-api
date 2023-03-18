import {Args, Mutation, Query, Resolver} from '@nestjs/graphql';

import CharacterSchema from '../schemas/character.schema';
import CharacterSchemaMapper from '../mappers/character-schema.mapper';
import CharacterUseCase from "../../application/use-cases/character.use-case";
import Uuid from "../../domain/value-objects/uuid";
import CharacterFilterOptionsArgumentSchema from "../schemas/arguments/character-filter-options.argument.schema";

@Resolver()
export class CharacterResolver {
  constructor(
    private readonly useCase: CharacterUseCase,
    private readonly mapper: CharacterSchemaMapper,
  ) {}

  @Query(returns => [CharacterSchema])
  characters(@Args('args', { nullable: true }) args?: CharacterFilterOptionsArgumentSchema) {
    return this.useCase.findAll(args).then((entities) => {
      return this.mapper.multipleToSchema(entities);
    });
  }

  @Query(returns => CharacterSchema)
  character(@Args('id') id: string) {
    return this.useCase.findOne(new Uuid(id)).then((entity) => {
      return this.mapper.toSchema(entity);
    });
  }

  @Mutation(returns => CharacterSchema)
  createCharacter() {
    return new CharacterSchema(
      '00000000-0000-0000-0000-000000000000',
        '',
        ''
    );
  }
}
