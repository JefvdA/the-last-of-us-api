import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import CharacterEntity from '../entities/character.entity';
import { Repository } from 'typeorm';
import CharacterEntityMapper from "../mappers/character-entity.mapper";
import Character from "../../domain/models/character";

@Injectable()
export class CharactersService {
  constructor(
    @InjectRepository(CharacterEntity)
    private readonly charactersRepository: Repository<CharacterEntity>,
    private readonly mapper: CharacterEntityMapper
  ) {}

  findAll(): Promise<Character[]> {
    return this.charactersRepository.find().then((entities: CharacterEntity[]): Character[] => {
      return this.mapper.multipleToDomain(entities);
    });
  }

  findOne(id: string): Promise<Character> {
    return this.charactersRepository.findOneBy({ id }).then((entity: CharacterEntity): Character => {
      return this.mapper.toDomain(entity);
    });
  }
}
