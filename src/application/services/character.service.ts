import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import CharacterEntity from '../../infrastructure/entities/character.entity';
import { Repository } from 'typeorm';
import CharacterEntityMapper from '../../infrastructure/mappers/character-entity.mapper';
import Character from '../../domain/models/character';
import NotFoundError from '../../domain/errors/not-found-error';
import CharacterFilterOptionsArgument from '../arguments/character/character-filter-options.argument';
import CharacterCreationArgument from '../arguments/character/character-creation.argument';
import CharacterCreationDto from '../dtos/character/character-creation.dto';
import CharacterUpdateArgument from '../arguments/character/character-update.argument';
import CharacterUpdateDto from '../dtos/character/character-update.dto';
import CrudService from '../../domain/interfaces/crud-service.interface';

@Injectable()
export class CharacterService implements CrudService<Character> {
  constructor(
    @InjectRepository(CharacterEntity)
    private readonly characterRepository: Repository<CharacterEntity>,
    private readonly mapper: CharacterEntityMapper,
  ) {}

  findAll(
    filterOptions?: CharacterFilterOptionsArgument,
  ): Promise<Character[]> {
    return this.characterRepository
      .findBy(filterOptions || {})
      .then((entities): Character[] => {
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

  create(character: CharacterCreationArgument): Promise<CharacterCreationDto> {
    return this.characterRepository.insert(character).then((result) => {
      return {
        uuid: result.identifiers[0].uuid,
      };
    });
  }

  update(character: CharacterUpdateArgument): Promise<CharacterUpdateDto> {
    return this.characterRepository
      .update({ uuid: character.uuid }, character)
      .then(() => {
        return {
          uuid: character.uuid,
        };
      });
  }
}
