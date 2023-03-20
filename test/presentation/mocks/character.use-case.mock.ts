import Character from "../../../src/domain/models/character";
import Uuid from "../../../src/domain/value-objects/uuid";
import CharacterUseCase from "../../../src/application/use-cases/character.use-case";
import CharacterCreationArgument from "../../../src/application/arguments/character/character-creation.argument";
import CharacterUpdateArgument from "../../../src/application/arguments/character/character-update.argument";
import CharacterUpdateDto from "../../../src/application/dtos/character/character-update.dto";
import CharacterCreationDto from "../../../src/application/dtos/character/character-creation.dto";
import CrudUseCase from "../../../src/domain/interfaces/crud-use-case.interface";

class CharacterUseCaseMock implements CrudUseCase<Character>{
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
    provide: CharacterUseCase,
    useClass: CharacterUseCaseMock
}