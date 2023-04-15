import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { CharactersService } from './characters.service';
import { Character } from './entities/character.entity';
import { CreateCharacterInput } from './dto/create-character.input';
import { UpdateCharacterInput } from './dto/update-character.input';
import { FilterCharactersInput } from './dto/filter-characters.input';
import { UpdateCharacterOutput } from './dto/update-character.output';

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
  findAll(
    @Args('filters', { nullable: true })
    filterOptions?: FilterCharactersInput,
  ) {
    return this.charactersService.findAll(filterOptions);
  }

  @Query(() => Character, { name: 'character' })
  findOne(@Args('uuid') uuid: string) {
    return this.charactersService.findOne(uuid);
  }

  @Mutation(() => UpdateCharacterOutput)
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
