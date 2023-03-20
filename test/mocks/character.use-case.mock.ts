import Character from '../../src/domain/models/character';
import CharacterUseCase from '../../src/application/use-cases/character.use-case';
import CharacterUpdateDto from '../../src/application/dtos/character/character-update.dto';
import CharacterCreationDto from '../../src/application/dtos/character/character-creation.dto';
import CrudUseCase from '../../src/domain/interfaces/crud-use-case.interface';
import CharacterDeletionDto from '../../src/application/dtos/character/character-deletion.dto';

class CharacterUseCaseMock implements CrudUseCase<Character> {
  findAll(): Promise<Character[]> {
    return Promise.resolve([
      new Character('00000000-0000-0000-0000-000000000000', 'John', 'Doe'),
    ]);
  }

  findOne(): Promise<Character> {
    return Promise.resolve(
      new Character('00000000-0000-0000-0000-000000000000', 'John', 'Doe'),
    );
  }

  create(): Promise<CharacterCreationDto> {
    return Promise.resolve({
      uuid: '00000000-0000-0000-0000-000000000000',
    });
  }

  update(): Promise<CharacterUpdateDto> {
    return Promise.resolve({
      uuid: '00000000-0000-0000-0000-000000000000',
    });
  }

  delete(): Promise<CharacterDeletionDto> {
    return Promise.resolve({
      uuid: '00000000-0000-0000-0000-000000000000',
    });
  }
}
export default {
  provide: CharacterUseCase,
  useClass: CharacterUseCaseMock,
};
