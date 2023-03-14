import {Injectable} from "@nestjs/common";
import CharacterEntity from "../entities/character.entity";
import Character from "../../domain/models/character";

@Injectable()
export default class CharacterEntityMapper {
    toDomain(entity: CharacterEntity): Character {
        return new Character(
          entity.id,
          entity.firstName || '',
          entity.lastName || ''
        );
    }
    toEntity(domain: Character): CharacterEntity {
        return new CharacterEntity(
          domain.id.value,
          domain.firstName,
          domain.lastName,
        );
    }

    multipleToDomain(entities: CharacterEntity[]): Character[] {
        return entities.map((entity) => {
            return this.toDomain(entity);
        })
    }

    multipleToEntity(domains: Character[]): CharacterEntity[] {
        return domains.map((domain) => {
            return this.toEntity(domain);
        })
    }
}