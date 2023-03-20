import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import CharacterSchema from '../schemas/character.schema';
import CharacterSchemaMapper from '../mappers/character-schema.mapper';
import CharacterUseCase from '../../application/use-cases/character.use-case';
import Uuid from '../../domain/value-objects/uuid';
import CharacterFilterOptionsArgumentSchema from '../schemas/arguments/character/character-filter-options.argument.schema';
import CharacterCreationArgumentSchema from '../schemas/arguments/character/character-creation.argument.schema';
import CharacterCreationResponseSchema from '../schemas/responses/character/character-creation.response.schema';
import CharacterUpdateResponseSchema from '../schemas/responses/character/character-update.response.schema';
import CharacterUpdateArgumentSchema from '../schemas/arguments/character/character-update.argument.schema';
import CharacterDeletionResponseSchema from "../schemas/responses/character/character-deletion.response.schema";

@Resolver()
export class CharacterResolver {
  constructor(
    private readonly useCase: CharacterUseCase,
    private readonly mapper: CharacterSchemaMapper,
  ) {}

  @Query(() => [CharacterSchema])
  characters(
    @Args('args', { nullable: true })
    args?: CharacterFilterOptionsArgumentSchema,
  ) {
    return this.useCase.findAll(args).then((domains) => {
      return this.mapper.multipleToSchema(domains);
    });
  }

  @Query(() => CharacterSchema)
  character(@Args('id') id: string) {
    return this.useCase.findOne(new Uuid(id)).then((domain) => {
      return this.mapper.toSchema(domain);
    });
  }

  @Mutation(() => CharacterCreationResponseSchema)
  createCharacter(
    @Args('character') character: CharacterCreationArgumentSchema,
  ) {
    return this.useCase.create(character);
  }

  @Mutation(() => CharacterUpdateResponseSchema)
  updateCharacter(@Args('character') character: CharacterUpdateArgumentSchema) {
    return this.useCase.update(character);
  }

  @Mutation(() => CharacterDeletionResponseSchema)
  deleteCharacter(@Args('id') id: string) {
    return this.useCase.delete(new Uuid(id));
  }
}
