import { Injectable } from '@nestjs/common';
import { CreateCharacterInput } from './dto/create-character.input';
import { UpdateCharacterInput } from './dto/update-character.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Character } from './entities/character.entity';
import { Repository } from 'typeorm';
import NotFoundError from '../domain/errors/not-found-error';
import { FilterCharactersInput } from './dto/filter-characters.input';

@Injectable()
export class CharactersService {
  constructor(
    @InjectRepository(Character)
    private readonly characterRepo: Repository<Character>,
  ) {}

  create(createCharacterInput: CreateCharacterInput) {
    return 'This action adds a new character';
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
    return `This action updates a #${uuid} character`;
  }

  remove(uuid: string) {
    return `This action removes a #${uuid} character`;
  }
}
