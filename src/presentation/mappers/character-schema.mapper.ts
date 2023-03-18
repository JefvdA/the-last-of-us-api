import { Injectable } from '@nestjs/common';
import CharacterSchema from '../schemas/character.schema';
import Character from '../../domain/models/character';

@Injectable()
export default class CharacterSchemaMapper {
  toDomain(schema: CharacterSchema): Character {
    return new Character(schema.id, schema.firstName, schema.lastName);
  }

  toSchema(domain: Character): CharacterSchema {
    return new CharacterSchema(
      domain.uuid.value,
      domain.firstName,
      domain.lastName,
    );
  }

  multipleToDomain(schemas: CharacterSchema[]): Character[] {
    return schemas.map((schema) => {
      return this.toDomain(schema);
    });
  }

  multipleToSchema(domains: Character[]): CharacterSchema[] {
    return domains.map((domain) => {
      return this.toSchema(domain);
    });
  }
}
