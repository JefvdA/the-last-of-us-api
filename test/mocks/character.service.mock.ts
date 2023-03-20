import { CharacterService } from '../../src/application/services/character.service';
import Character from '../../src/domain/models/character';
import CharacterCreationDto from '../../src/application/dtos/character/character-creation.dto';
import CharacterUpdateDto from '../../src/application/dtos/character/character-update.dto';
import CrudService from '../../src/domain/interfaces/crud-service.interface';
import CharacterDeletionDto from "../../src/application/dtos/character/character-deletion.dto";

class CharacterServiceMock implements CrudService<Character> {
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
  provide: CharacterService,
  useClass: CharacterServiceMock,
};
