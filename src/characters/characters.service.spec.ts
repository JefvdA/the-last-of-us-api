import { Test, TestingModule } from '@nestjs/testing';
import { CharactersService } from './characters.service';
import { Repository } from 'typeorm';
import { Character } from './entities/character.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import {
  fakeCharacterRepository,
  fakeCreateCharacterInput,
  fakeFilterCharactersInput,
  fakeUpdateCharacterInput,
  fakeUuid,
} from '../constants/fakes';

describe(CharactersService.name, () => {
  let charactersService: CharactersService;
  let characterRepo: Repository<Character>;

  beforeEach(async () => {
    const testModule: TestingModule = await Test.createTestingModule({
      providers: [CharactersService, fakeCharacterRepository],
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
      charactersService.create(fakeCreateCharacterInput);

      expect(characterRepo.create).toHaveBeenCalledWith(
        fakeCreateCharacterInput,
      );
    });

    it('should call CharacterRepository.insert with the correct arguments', () => {
      charactersService.create(fakeCreateCharacterInput);

      const characterRepoCreateResult = characterRepo.create(
        fakeCreateCharacterInput,
      );

      expect(characterRepo.insert).toHaveBeenCalledWith(
        characterRepoCreateResult,
      );
    });
  });

  describe('findAll', () => {
    it('should call CharacterRepository.findBy with the correct arguments', () => {
      charactersService.findAll(fakeFilterCharactersInput);

      expect(characterRepo.findBy).toHaveBeenCalledWith(
        fakeFilterCharactersInput,
      );
    });
  });

  describe('findOne', () => {
    it('should call CharacterRepository.findOneBy with the correct arguments', () => {
      charactersService.findOne(fakeUuid);

      expect(characterRepo.findOneBy).toHaveBeenCalledWith({
        uuid: fakeUuid.value,
      });
    });
  });

  describe('update', () => {
    it('should call CharacterRepository.update with the correct arguments', () => {
      charactersService.update(fakeUuid, fakeUpdateCharacterInput);

      expect(characterRepo.update).toHaveBeenCalledWith(
        { uuid: fakeUuid.value },
        fakeUpdateCharacterInput,
      );
    });
  });

  describe('remove', () => {
    it('should call CharacterRepository.delete with the correct arguments', () => {
      charactersService.remove(fakeUuid);

      expect(characterRepo.delete).toHaveBeenCalledWith({
        uuid: fakeUuid.value,
      });
    });
  });
});
