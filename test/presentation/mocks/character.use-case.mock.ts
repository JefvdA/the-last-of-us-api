import Character from "../../../src/domain/models/character";
import Uuid from "../../../src/domain/value-objects/uuid";
import CharacterUseCase from "../../../src/application/use-cases/character.use-case";
import CharacterCreationArgument from "../../../src/application/arguments/character/character-creation.argument";

class CharacterUseCaseMock {
    findAll(): Promise<Character[]> {
        return Promise.resolve([
            new Character(
                '00000000-0000-0000-0000-000000000000',
                'John',
                'Doe'
            )
        ]);
    }

    findOne(id: Uuid): Promise<Character> {
        return Promise.resolve(new Character(
                '00000000-0000-0000-0000-000000000000',
                'John',
                'Doe'
            )
        );
    }

    create(character: CharacterCreationArgument): Promise<Character> {
        return Promise.resolve(new Character(
            '00000000-0000-0000-0000-000000000000',
            character.firstName,
            character.lastName
        ));
    }
}
export default {
    provide: CharacterUseCase,
    useClass: CharacterUseCaseMock
}