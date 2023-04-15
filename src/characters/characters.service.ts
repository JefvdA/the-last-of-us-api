import { Injectable } from '@nestjs/common';
import { CreateCharacterInput } from './dto/create-character.input';
import { UpdateCharacterInput } from './dto/update-character.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Character } from './entities/character.entity';
import { Repository } from 'typeorm';
import NotFoundError from '../domain/errors/not-found-error';
import { FilterCharactersInput } from './dto/filter-characters.input';
import { UpdateCharacterOutput } from './dto/update-character.output';
import { DeleteCharacterOutput } from './dto/delete-character.output';

@Injectable()
export class CharactersService {
  constructor(
    @InjectRepository(Character)
    private readonly characterRepo: Repository<Character>,
  ) {}

  create(createCharacterInput: CreateCharacterInput) {
    const entity = this.characterRepo.create(createCharacterInput);

    return this.characterRepo.insert(entity).then(() => entity);
  }

  findAll(filterOptions?: FilterCharactersInput) {
    return this.characterRepo.findBy(filterOptions || {});
  }

  findOne(uuid: string) {
    return this.characterRepo
      .findOneBy({ uuid: uuid })
      .then((character: Character | null): Character => {
        if (!character) throw new NotFoundError(Character.name);

        return character;
      });
  }

  update(uuid: string, updateCharacterInput: UpdateCharacterInput) {
    return this.characterRepo
      .update({ uuid: uuid }, updateCharacterInput)
      .then(() => new UpdateCharacterOutput(uuid));
  }

  remove(uuid: string) {
    return this.characterRepo
      .delete({ uuid: uuid })
      .then(() => new DeleteCharacterOutput(uuid));
  }
}
