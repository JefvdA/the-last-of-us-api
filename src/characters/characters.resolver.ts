import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { CharactersService } from './characters.service';
import { Character } from './entities/character.entity';
import { CreateCharacterInput } from './dto/create-character.input';
import { UpdateCharacterInput } from './dto/update-character.input';
import { FilterCharactersInput } from './dto/filter-characters.input';
import { UpdateCharacterOutput } from './dto/update-character.output';
import { RemoveCharacterOutput } from './dto/remove-character.output';
import Uuid from '../domain/value-objects/uuid';

@Resolver(() => Character)
export class CharactersResolver {
  constructor(private readonly charactersService: CharactersService) {}

  @Mutation(() => Character)
  createCharacter(
    @Args('createCharacterInput') createCharacterInput: CreateCharacterInput,
  ): Promise<Character> {
    return this.charactersService.create(createCharacterInput);
  }

  @Query(() => [Character], { name: 'characters' })
  findAll(
    @Args('filters', { nullable: true })
    filterOptions?: FilterCharactersInput,
  ): Promise<Character[]> {
    return this.charactersService.findAll(filterOptions);
  }

  @Query(() => Character, { name: 'character' })
  findOne(@Args('uuid') uuid: string): Promise<Character> {
    return this.charactersService.findOne(new Uuid(uuid));
  }

  @Mutation(() => UpdateCharacterOutput)
  updateCharacter(
    @Args('updateCharacterInput') updateCharacterInput: UpdateCharacterInput,
  ): Promise<UpdateCharacterOutput> {
    return this.charactersService.update(
      new Uuid(updateCharacterInput.uuid),
      updateCharacterInput,
    );
  }

  @Mutation(() => RemoveCharacterOutput)
  removeCharacter(@Args('uuid') uuid: string): Promise<RemoveCharacterOutput> {
    return this.charactersService.remove(new Uuid(uuid));
  }
}
