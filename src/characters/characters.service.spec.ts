import { Test, TestingModule } from '@nestjs/testing';
import { CharactersService } from './characters.service';
import { Repository } from 'typeorm';
import { Character } from './entities/character.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import {
  fakeCharacter,
  fakeCharacterRepository,
  fakeCreateCharacterInput,
  fakeFilterCharactersInput,
  fakeUpdateCharacterInput,
  fakeUuid,
} from '../constants/fakes';
import NotFoundError from '../domain/errors/not-found-error';
import Uuid from '../domain/value-objects/uuid';

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

    it('should return the newly created entity', () => {
      const characterRepoCreateResult = characterRepo.create(
        fakeCreateCharacterInput,
      );

      charactersService.create(fakeCreateCharacterInput).then((result) => {
        expect(result).toEqual(characterRepoCreateResult);
      });
    });
  });

  describe('findAll', () => {
    it('should call CharacterRepository.findBy with the correct arguments', () => {
      charactersService.findAll(fakeFilterCharactersInput);

      expect(characterRepo.findBy).toHaveBeenCalledWith(
        fakeFilterCharactersInput,
      );
    });

    it('should not use any filters if they arent provided', () => {
      charactersService.findAll();

      expect(characterRepo.findBy).toHaveBeenCalledWith({});
    });
  });

  describe('findOne', () => {
    it('should call CharacterRepository.findOneBy with the correct arguments', () => {
      charactersService.findOne(fakeUuid);

      expect(characterRepo.findOneBy).toHaveBeenCalledWith({
        uuid: fakeUuid.value,
      });
    });

    it('should throw a NotFoundError if there was no character found', async () => {
      jest.spyOn(characterRepo, 'findOneBy').mockResolvedValue(null);

      await expect(charactersService.findOne(fakeUuid)).rejects.toThrow(
        NotFoundError,
      );
    });
  });

  describe('update', () => {
    it('should call CharacterRepository.update with the correct arguments', async () => {
      jest.spyOn(characterRepo, 'findOneBy').mockResolvedValue(fakeCharacter);

      await charactersService.update(
        new Uuid(fakeCharacter.uuid),
        fakeUpdateCharacterInput,
      );

      expect(characterRepo.update).toHaveBeenCalledWith(
        { uuid: fakeCharacter.uuid },
        fakeUpdateCharacterInput,
      );
    });

    it(`should throw a NotFoundError if the character to update doesn't exist`, async () => {
      jest.spyOn(characterRepo, 'findOneBy').mockResolvedValue(null);

      await expect(
        charactersService.update(
          new Uuid(fakeCharacter.uuid),
          fakeUpdateCharacterInput,
        ),
      ).rejects.toThrow(NotFoundError);
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
