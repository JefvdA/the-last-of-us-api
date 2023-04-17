import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Character } from '../../../src/characters/entities/character.entity';
import { Repository } from 'typeorm';
import { HttpStatus, INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import {
  GET_CHARACTER_BY_UUID,
  GET_CHARACTERS_FILTER_FIRSTNAME_AND_LASTNAME_QUERY,
  GET_CHARACTERS_QUERY,
} from './graphql-requests';
import AppModule from '../../../src/app.module';
import { fakeUuid } from '../../../src/constants/fakes';

describe('GraphQL queries to fetch characters', () => {
  let app: INestApplication;
  let characterRepo: Repository<Character>;

  const startingCharacters: Array<Character> = [
    new Character('John', 'Doe'),
    new Character('Jane', 'Doe'),
  ];

  startingCharacters[0].uuid = fakeUuid.value;

  beforeAll(async () => {
    const testModule: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    characterRepo = testModule.get<Repository<Character>>(
      getRepositoryToken(Character),
    );

    app = testModule.createNestApplication();
    await app.init();
  });

  beforeEach(async () => {
    await characterRepo.clear();
    await characterRepo.save(startingCharacters);
  });

  afterAll(async () => {
    await app.close();
  });

  it('should setup the tests correctly', () => {
    expect(true).toBeTruthy();
  });

  describe('findAll', () => {
    it('should include a characters property body.data', async () => {
      await request(app.getHttpServer())
        .post('/graphql')
        .send(GET_CHARACTERS_QUERY)
        .then((res) => {
          const data = res.body.data;

          expect(data).toHaveProperty('characters');
        });
    });

    it('should return all characters from the database', async () => {
      await request(app.getHttpServer())
        .post('/graphql')
        .send(GET_CHARACTERS_QUERY)
        .then((res) => {
          const data = res.body.data;

          const sortedStartingCharacters = startingCharacters.sort(
            (a: Character, b: Character) =>
              a.firstName.localeCompare(b.firstName),
          );
          const sortedReturnedCharacters = data.characters.sort(
            (a: Character, b: Character) =>
              a.firstName.localeCompare(b.firstName),
          );

          expect(data.characters.length).toEqual(startingCharacters.length);
          expect(sortedReturnedCharacters).toEqual(sortedStartingCharacters);
        });
    });

    it('should filter the results on firstName and lastName if the filters are passed', async () => {
      const filteredFirstName = 'John';
      const filteredLastName = 'Doe';

      await request(app.getHttpServer())
        .post('/graphql')
        .send(
          GET_CHARACTERS_FILTER_FIRSTNAME_AND_LASTNAME_QUERY(
            filteredFirstName,
            filteredLastName,
          ),
        )
        .then((res) => {
          const characters = res.body.data.characters;

          expect(characters.length).toEqual(1); // 1 starting character is named 'John Doe'
          expect(characters[0].firstName).toEqual(filteredFirstName);
          expect(characters[0].lastName).toEqual(filteredLastName);
        });
    });
  });

  describe('findOne', () => {
    it('should return the character with the requested uuid', async () => {
      await request(app.getHttpServer())
        .post('/graphql')
        .send(GET_CHARACTER_BY_UUID(startingCharacters[0].uuid)) // We are searching for the first starting character
        .then((res) => {
          const character: Character = res.body.data.character;

          expect(character.uuid).toEqual(startingCharacters[0].uuid);
          expect(character.firstName).toEqual(startingCharacters[0].firstName);
          expect(character.lastName).toEqual(startingCharacters[0].lastName);
        });
    });

    it('should return not found error if there is no character with the requested uuid', async () => {
      await request(app.getHttpServer())
        .post('/graphql')
        .send(GET_CHARACTER_BY_UUID('45f37235-9c55-4c52-88e1-49db43e0810a'))
        .then((res) => {
          const error = res.body.errors[0];

          expect(error.message).toEqual('Character was not found');
          expect(error.extensions.statusCode).toEqual(HttpStatus.NOT_FOUND);
          expect(error.extensions.code).toEqual(
            HttpStatus[HttpStatus.NOT_FOUND],
          );
        });
    });

    it('should return validation error if the requested uuid was invalid', async () => {
      const invalidUuid = 'this is an invalid uuid';

      await request(app.getHttpServer())
        .post('/graphql')
        .send(GET_CHARACTER_BY_UUID(invalidUuid))
        .then((res) => {
          const error = res.body.errors[0];

          expect(error.message).toEqual(
            `${invalidUuid} is an invalid value for Uuid`,
          );
          expect(error.extensions.statusCode).toEqual(HttpStatus.BAD_REQUEST);
          expect(error.extensions.code).toEqual(
            HttpStatus[HttpStatus.BAD_REQUEST],
          );
        });
    });
  });
});
