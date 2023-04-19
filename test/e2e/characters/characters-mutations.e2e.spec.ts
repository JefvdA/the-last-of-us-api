import { HttpStatus, INestApplication } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Character } from '../../../src/characters/entities/character.entity';
import { fakeUuid } from '../../../src/constants/fakes';
import { Test, TestingModule } from '@nestjs/testing';
import AppModule from '../../../src/app.module';
import { getRepositoryToken } from '@nestjs/typeorm';
import * as request from 'supertest';
import { CREATE_CHARACTER_MUTATION } from './graphql-requests';
import Uuid from '../../../src/domain/value-objects/uuid';
import ValueObjectValidationError from '../../../src/domain/errors/value-object-validation-error';

describe('GraphQL mutations to for (c)RUD operations on characters', () => {
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

  describe('createCharacter', () => {
    it('should include a createCharacter property in body.data', async () => {
      await request(app.getHttpServer())
        .post('/graphql')
        .send(CREATE_CHARACTER_MUTATION('Jack', 'Doe'))
        .then((res) => {
          const data = res.body.data;

          expect(data).toHaveProperty('createCharacter');
        });
    });

    it('should generate a uuid for the new entity', async () => {
      await request(app.getHttpServer())
        .post('/graphql')
        .send(CREATE_CHARACTER_MUTATION('Jack', 'Doe'))
        .then((res) => {
          const createdCharacter: Character = res.body.data.createCharacter;

          expect(createdCharacter.uuid).toBeDefined();
          expect(() => new Uuid(createdCharacter.uuid)).not.toThrow(
            ValueObjectValidationError,
          );
        });
    });

    it('should have created a character with given firstName and lastname', async () => {
      const firstName = 'Jack';
      const lastName = 'Doe';

      await request(app.getHttpServer())
        .post('/graphql')
        .send(CREATE_CHARACTER_MUTATION(firstName, lastName))
        .then((res) => {
          const createdCharacter: Character = res.body.data.createCharacter;

          expect(createdCharacter.firstName).toEqual(firstName);
          expect(createdCharacter.lastName).toEqual(lastName);
        });
    });

    it('should return conflict error if there is already a character with this firstname-lastname combination', async () => {
      const existingFirstName = startingCharacters[0].firstName;
      const existingLastName = startingCharacters[0].lastName;

      await request(app.getHttpServer())
        .post('/graphql')
        .send(CREATE_CHARACTER_MUTATION(existingFirstName, existingLastName))
        .then((res) => {
          const error = res.body.errors[0];

          expect(error.extensions.statusCode).toEqual(HttpStatus.CONFLICT);
          expect(error.extensions.code).toEqual(
            HttpStatus[HttpStatus.CONFLICT],
          );
        });
    });
  });
});
