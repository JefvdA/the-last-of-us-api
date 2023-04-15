import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { CharactersService } from './characters.service';
import { Character } from './entities/character.entity';
import { CreateCharacterInput } from './dto/create-character.input';
import { UpdateCharacterInput } from './dto/update-character.input';

@Resolver(() => Character)
export class CharactersResolver {
  constructor(private readonly charactersService: CharactersService) {}

  @Mutation(() => Character)
  createCharacter(
    @Args('createCharacterInput') createCharacterInput: CreateCharacterInput,
  ) {
    return this.charactersService.create(createCharacterInput);
  }

  @Query(() => [Character], { name: 'characters' })
  findAll() {
    return this.charactersService.findAll();
  }

  @Query(() => Character, { name: 'character' })
  findOne(@Args('uuid') uuid: string) {
    return this.charactersService.findOne(uuid);
  }

  @Mutation(() => Character)
  updateCharacter(
    @Args('updateCharacterInput') updateCharacterInput: UpdateCharacterInput,
  ) {
    return this.charactersService.update(
      updateCharacterInput.uuid,
      updateCharacterInput,
    );
  }

  @Mutation(() => Character)
  removeCharacter(@Args('uuid') uuid: string) {
    return this.charactersService.remove(uuid);
  }
}
