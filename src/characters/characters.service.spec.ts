import { Test, TestingModule } from '@nestjs/testing';
import { CharactersService } from './characters.service';
import { Repository } from 'typeorm';
import { Character } from './entities/character.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import {
  emptyPromise,
  testCreateCharacterInput,
  testFilterCharactersInput,
  testUpdateCharacterInput,
  testUuid,
} from '../constants/test-values';

describe(CharactersService.name, () => {
  let charactersService: CharactersService;
  let characterRepo: Repository<Character>;

  beforeEach(async () => {
    const testModule: TestingModule = await Test.createTestingModule({
      providers: [
        CharactersService,
        {
          provide: getRepositoryToken(Character),
          useValue: {
            create: jest.fn(),
            insert: jest.fn(() => emptyPromise),
            findBy: jest.fn(() => emptyPromise),
            findOneBy: jest.fn(() => emptyPromise),
            update: jest.fn(() => emptyPromise),
            delete: jest.fn(() => emptyPromise),
          },
        },
      ],
    }).compile();

    charactersService = testModule.get<CharactersService>(CharactersService);
    characterRepo = testModule.get<Repository<Character>>(
      getRepositoryToken(Character),
    );
  });

  it('should be defined', () => {
    expect(charactersService).toBeDefined();
  });

  describe('create', () => {
    it('should call CharacterRepository.create with the correct arguments', () => {
      charactersService.create(testCreateCharacterInput);

      expect(characterRepo.create).toHaveBeenCalledWith(
        testCreateCharacterInput,
      );
    });

    it('should call CharacterRepository.insert with the correct arguments', () => {
      charactersService.create(testCreateCharacterInput);

      const characterRepoCreateResult = characterRepo.create(
        testCreateCharacterInput,
      );

      expect(characterRepo.insert).toHaveBeenCalledWith(
        characterRepoCreateResult,
      );
    });
  });

  describe('findAll', () => {
    it('should call CharacterRepository.findBy with the correct arguments', () => {
      charactersService.findAll(testFilterCharactersInput);

      expect(characterRepo.findBy).toHaveBeenCalledWith(
        testFilterCharactersInput,
      );
    });
  });

  describe('findOne', () => {
    it('should call CharacterRepository.findOneBy with the correct arguments', () => {
      charactersService.findOne(testUuid);

      expect(characterRepo.findOneBy).toHaveBeenCalledWith({
        uuid: testUuid.value,
      });
    });
  });

  describe('update', () => {
    it('should call CharacterRepository.update with the correct arguments', () => {
      charactersService.update(testUuid, testUpdateCharacterInput);

      expect(characterRepo.update).toHaveBeenCalledWith(
        { uuid: testUuid.value },
        testUpdateCharacterInput,
      );
    });
  });

  describe('remove', () => {
    it('should call CharacterRepository.delete with the correct arguments', () => {
      charactersService.remove(testUuid);

      expect(characterRepo.delete).toHaveBeenCalledWith({
        uuid: testUuid.value,
      });
    });
  });
});
