import { Args, Query, Resolver } from '@nestjs/graphql';
import CharacterEntity from '../../infrastructure/entities/character.entity';
import { CharactersService } from '../../infrastructure/services/characters.service';
import CharacterSchema from '../schemas/character.schema';
import CharacterSchemaMapper from "../mappers/character-schema.mapper";

@Resolver(CharacterSchema)
export class CharactersResolver {
  constructor(private readonly charactersService: CharactersService,
              private readonly mapper: CharacterSchemaMapper) {}

  @Query(() => CharacterSchema)
  character(@Args('id', { type: () => String }) id: string) {
    return this.charactersService.findOne(id).then((entity) => {
      return this.mapper.toSchema(entity);
    })
  }

  @Query(() => [CharacterSchema])
  characters() {
    return this.charactersService.findAll().then((entities) => {
      return this.mapper.multipleToSchema(entities);
    })
  }
}
