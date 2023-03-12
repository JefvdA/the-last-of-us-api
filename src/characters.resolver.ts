import { Args, Int, Query, Resolver } from '@nestjs/graphql';
import { Character } from './character';

@Resolver(Character)
export class CharactersResolver {
  @Query(() => Character)
  character(@Args('id', { type: () => Int }) id: number) {
    return new Character(id, 'Joel', 'Miller');
  }

  @Query(() => [Character])
  characters() {
    return [
      new Character(1, 'Joel', 'Miller'),
      new Character(2, 'Ellie', 'Williams'),
    ];
  }
}
