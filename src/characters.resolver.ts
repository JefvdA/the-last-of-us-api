import { Args, Int, Query, Resolver } from '@nestjs/graphql';
import { CharacterEntity } from './character.entity';
import {CharactersService} from "./characters.service";

@Resolver(CharacterEntity)
export class CharactersResolver {
  constructor(
      private readonly charactersService: CharactersService,
  ) {}

  @Query(() => CharacterEntity)
  character(@Args('id', { type: () => Int }) id: number) {
    return this.charactersService.findOne(id);
  }

  @Query(() => [CharacterEntity])
  characters() {
    return this.charactersService.findAll();
  }
}
