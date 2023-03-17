import { Args, Query, Resolver } from '@nestjs/graphql';
import { CharacterService } from '../../infrastructure/services/character.service';
import CharacterSchema from '../schemas/character.schema';
import CharacterSchemaMapper from '../mappers/character-schema.mapper';

@Resolver()
export class CharacterResolver {
  constructor(
    private readonly charactersService: CharacterService,
    private readonly mapper: CharacterSchemaMapper,
  ) {}

  @Query(() => [CharacterSchema])
  characters() {
    return this.charactersService.findAll().then((entities) => {
      return this.mapper.multipleToSchema(entities);
    });
  }

  @Query(() => CharacterSchema)
  character(@Args('id', { type: () => String }) id: string) {
    return this.charactersService.findOne(id).then((entity) => {
      return this.mapper.toSchema(entity);
    });
  }
}