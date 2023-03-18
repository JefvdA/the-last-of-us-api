import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import CharacterEntity from '../../infrastructure/entities/character.entity';
import { Repository } from 'typeorm';
import CharacterEntityMapper from '../../infrastructure/mappers/character-entity.mapper';
import Character from '../../domain/models/character';
import NotFoundError from "../../domain/errors/not-found-error";
import CharacterFilterOptionsArgument from "../arguments/character/character-filter-options.argument";
import CharacterCreationArgument from "../arguments/character/CharacterCreationArgument";

@Injectable()
export class CharacterService {
  constructor(
    @InjectRepository(CharacterEntity)
    private readonly characterRepository: Repository<CharacterEntity>,
    private readonly mapper: CharacterEntityMapper,
  ) {}

  findAll(filterOptions?: CharacterFilterOptionsArgument): Promise<Character[]> {
    return this.characterRepository.findBy(filterOptions || {}).then((entities): Character[] => {
      return this.mapper.multipleToDomain(entities);
    });
  }

  findOne(uuid: string): Promise<Character> {
    return this.characterRepository
      .findOneBy({ uuid: uuid })
      .then((entity): Character => {
        if (entity === null) {
          throw new NotFoundError(Character.name);
        }

        return this.mapper.toDomain(entity);
      });
  }

  create(character: CharacterCreationArgument): Character {
    const newCharacter = this.characterRepository.create(character);

    return this.mapper.toDomain(newCharacter);
  }
}
