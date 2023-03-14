import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import CharacterEntity from './infrastructure/entities/character.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CharactersService {
  constructor(
    @InjectRepository(CharacterEntity)
    private readonly charactersRepository: Repository<CharacterEntity>,
  ) {}

  findAll(): Promise<CharacterEntity[]> {
    return this.charactersRepository.find();
  }

  findOne(id: string): Promise<CharacterEntity | null> {
    return this.charactersRepository.findOneBy({ id });
  }
}
