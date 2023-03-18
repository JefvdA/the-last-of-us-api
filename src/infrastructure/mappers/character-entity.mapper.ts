import { Injectable } from '@nestjs/common';
import CharacterEntity from '../entities/character.entity';
import Character from '../../domain/models/character';

@Injectable()
export default class CharacterEntityMapper {
  toDomain(entity: CharacterEntity): Character {
    return new Character(
      entity.uuid,
      entity.firstName,
      entity.lastName,
    );
  }

  multipleToDomain(entities: CharacterEntity[]): Character[] {
    return entities.map((entity) => {
      return this.toDomain(entity);
    });
  }
}
