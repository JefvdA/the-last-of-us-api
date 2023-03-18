import { Args, Query, Resolver } from '@nestjs/graphql';

import CharacterSchema from '../schemas/character.schema';
import CharacterSchemaMapper from '../mappers/character-schema.mapper';
import CharacterUseCase from "../../application/use-cases/character.use-case";
import Uuid from "../../domain/value-objects/uuid";

@Resolver()
export class CharacterResolver {
  constructor(
    private readonly useCase: CharacterUseCase,
    private readonly mapper: CharacterSchemaMapper,
  ) {}

  @Query(() => [CharacterSchema])
  characters() {
    return this.useCase.findAll().then((entities) => {
      return this.mapper.multipleToSchema(entities);
    });
  }

  @Query(() => CharacterSchema)
  character(@Args('id', { type: () => String }) id: string) {
    return this.useCase.findOne(new Uuid(id)).then((entity) => {
      return this.mapper.toSchema(entity);
    });
  }
}
