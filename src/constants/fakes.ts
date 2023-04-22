import { CreateCharacterInput } from '../characters/dto/create-character.input';
import { FilterCharactersInput } from '../characters/dto/filter-characters.input';
import { UpdateCharacterInput } from '../characters/dto/update-character.input';
import Uuid from '../domain/value-objects/uuid';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Character } from '../characters/entities/character.entity';

export const emptyPromise = new Promise((resolve) => resolve(undefined));

export const fakeUuid = new Uuid('44241dba-6b16-4516-9e37-793e104da01d');

export const fakeCharacter = new Character('John', 'Doe');
fakeCharacter.uuid = fakeUuid.value;

export const fakeCreateCharacterInput = new CreateCharacterInput();
fakeCreateCharacterInput.firstName = 'John';
fakeCreateCharacterInput.lastName = 'Doe';

export const fakeFilterCharactersInput = new FilterCharactersInput();
fakeFilterCharactersInput.firstName = 'John';
fakeFilterCharactersInput.lastName = 'Doe';

export const fakeUpdateCharacterInput = new UpdateCharacterInput();
fakeUpdateCharacterInput.uuid = fakeCharacter.uuid;
fakeUpdateCharacterInput.firstName = fakeCharacter.firstName;
fakeUpdateCharacterInput.lastName = fakeCharacter.lastName;

export const fakeCharacterRepository = {
  provide: getRepositoryToken(Character),
  useValue: {
    create: jest.fn(() => fakeCharacter),
    insert: jest.fn(() => emptyPromise),
    findBy: jest.fn(
      () => new Promise((resolve) => resolve([fakeCharacter, fakeCharacter])),
    ),
    findOneBy: jest.fn(() => new Promise((resolve) => resolve(fakeCharacter))),
    update: jest.fn(() => emptyPromise),
    delete: jest.fn(() => emptyPromise),
  },
};
