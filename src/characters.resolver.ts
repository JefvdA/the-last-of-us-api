import { Args, Int, Query, Resolver } from '@nestjs/graphql';
import CharacterEntity from './infrastructure/entities/character.entity';
import { CharactersService } from './characters.service';
import CharacterSchema from "./infrastructure/schemas/character.schema";

@Resolver(CharacterEntity)
export class CharactersResolver {
  constructor(private readonly charactersService: CharactersService) {}

  @Query(() => CharacterSchema)
  character(@Args('id', { type: () => Int }) id: string) {
    return this.charactersService.findOne(id);
  }

  @Query(() => [CharacterSchema])
  characters() {
    return this.charactersService.findAll();
  }
}
