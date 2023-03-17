import {CharacterService} from "../../../src/infrastructure/services/character.service";
import Character from "../../../src/domain/models/character";

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
}
export default {
    provide: CharacterService,
    useClass: CharacterServiceMock
}