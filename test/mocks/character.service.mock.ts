import {CharacterService} from "../../src/application/services/character.service";
import Character from "../../src/domain/models/character";
import CharacterCreationArgument from "../../src/application/arguments/character/character-creation.argument";
import CharacterCreationDto from "../../src/application/dtos/character/character-creation.dto";
import CharacterUpdateArgument from "../../src/application/arguments/character/character-update.argument";
import CharacterUpdateDto from "../../src/application/dtos/character/character-update.dto";
import CrudService from "../../src/domain/interfaces/crud-service.interface";

class CharacterServiceMock implements CrudService<Character> {
    findAll(): Promise<Character[]> {
        return Promise.resolve([
            new Character(
                '00000000-0000-0000-0000-000000000000',
                'John',
                'Doe'
            )
        ]);
    }

    findOne(id: string): Promise<Character> {
        return Promise.resolve(new Character(
                '00000000-0000-0000-0000-000000000000',
                'John',
                'Doe'
            )
        );
    }

    create(character: CharacterCreationArgument): Promise<CharacterCreationDto> {
        return Promise.resolve({
            uuid: '00000000-0000-0000-0000-000000000000'
        });
    }

    update(character: CharacterUpdateArgument): Promise<CharacterUpdateDto> {
        return Promise.resolve({
            uuid: '00000000-0000-0000-0000-000000000000'
        });
    }
}
export default {
    provide: CharacterService,
    useClass: CharacterServiceMock
}