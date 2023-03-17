import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import CharacterEntity from '../entities/character.entity';
import { Repository } from 'typeorm';
import CharacterEntityMapper from '../mappers/character-entity.mapper';
import Character from '../../domain/models/character';
import NotFoundError from "../../domain/errors/not-found-error";

@Injectable()
export class CharacterService {
  constructor(
    @InjectRepository(CharacterEntity)
    private readonly characterRepository: Repository<CharacterEntity>,
    private readonly mapper: CharacterEntityMapper,
  ) {}

  findAll(): Promise<Character[]> {
    return this.characterRepository.find().then((entities): Character[] => {
      return this.mapper.multipleToDomain(entities);
    });
  }

  findOne(id: string): Promise<Character> {
    return this.characterRepository
      .findOneBy({ id })
      .then((entity): Character => {
        if (entity === null) {
          throw new NotFoundError(Character.name);
        }

        return this.mapper.toDomain(entity);
      });
  }
}