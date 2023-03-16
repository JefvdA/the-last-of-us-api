import {CharactersService} from "../../../src/infrastructure/services/characters.service";
import Character from "../../../src/domain/models/character";

class CharactersServiceMock {
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
    provide: CharactersService,
    useClass: CharactersServiceMock
}