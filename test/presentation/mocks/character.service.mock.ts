import {CharacterService} from "../../../src/application/services/character.service";
import Character from "../../../src/domain/models/character";
import CharacterCreationArgument from "../../../src/application/arguments/character/character-creation.argument";

class CharacterServiceMock {
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

    create(character: CharacterCreationArgument): Character {
        return new Character(
        '00000000-0000-0000-0000-000000000000',
        'John',
        'Doe'
        );
    }
}
export default {
    provide: CharacterService,
    useClass: CharacterServiceMock
}