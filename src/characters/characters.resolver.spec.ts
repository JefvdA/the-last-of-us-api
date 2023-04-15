import { CharactersResolver } from './characters.resolver';
import { Test, TestingModule } from '@nestjs/testing';
import { CharactersService } from './characters.service';
import { CreateCharacterInput } from './dto/create-character.input';
import { FilterCharactersInput } from './dto/filter-characters.input';
import { testUuid } from '../constants/test-values';
import { UpdateCharacterInput } from './dto/update-character.input';
jest.mock('./characters.service');

describe(CharactersResolver.name, () => {
  let charactersResolver: CharactersResolver;
  let charactersService: CharactersService;

  beforeEach(async () => {
    const testModule: TestingModule = await Test.createTestingModule({
      providers: [CharactersResolver, CharactersService],
    }).compile();

    charactersResolver = testModule.get<CharactersResolver>(CharactersResolver);
    charactersService = testModule.get<CharactersService>(CharactersService);
  });

  it('should be defined', () => {
    expect(charactersResolver).toBeDefined();
  });

  describe('createCharacter', () => {
    it('should call CharacterService.create with the correct arguments', () => {
      const createCharacterInput = new CreateCharacterInput();
      createCharacterInput.firstName = 'John';
      createCharacterInput.lastName = 'Doe';

      charactersResolver.createCharacter(createCharacterInput);

      expect(charactersService.create).toHaveBeenCalledWith(
        createCharacterInput,
      );
    });
  });

  describe('findAll', () => {
    it('should call CharacterService.findAll with the correct arguments', () => {
      const filterOptions = new FilterCharactersInput();
      filterOptions.firstName = 'John';
      filterOptions.lastName = 'Doe';

      charactersResolver.findAll(filterOptions);

      expect(charactersService.findAll).toHaveBeenCalledWith(filterOptions);
    });
  });

  describe('findOne', () => {
    it('should call CharacterService.findOne with the correct arguments', () => {
      charactersResolver.findOne(testUuid.value);

      expect(charactersService.findOne).toHaveBeenCalledWith(testUuid);
    });
  });

  describe('updateCharacter', () => {
    it('should call CharacterService.update with the correct arguments', () => {
      const updateCharacterInput = new UpdateCharacterInput();
      updateCharacterInput.uuid = testUuid.value;
      updateCharacterInput.firstName = 'Joe';
      updateCharacterInput.lastName = 'Doe';

      charactersResolver.updateCharacter(updateCharacterInput);

      expect(charactersService.update).toHaveBeenCalledWith(
        testUuid,
        updateCharacterInput,
      );
    });
  });

  describe('removeCharacter', () => {
    it('should call CharacterService.remove with the correct arguments', () => {
      charactersResolver.removeCharacter(testUuid.value);

      expect(charactersService.remove).toHaveBeenCalledWith(testUuid);
    });
  });
});
