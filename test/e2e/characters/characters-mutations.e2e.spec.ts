import { HttpStatus, INestApplication } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Character } from '../../../src/characters/entities/character.entity';
import { fakeUuid } from '../../../src/constants/fakes';
import { Test, TestingModule } from '@nestjs/testing';
import AppModule from '../../../src/app.module';
import { getRepositoryToken } from '@nestjs/typeorm';
import * as request from 'supertest';
import {
  CREATE_CHARACTER_MUTATION,
  REMOVE_CHARACTER_MUTATION,
  UPDATE_CHARACTER_MUTATION,
} from './graphql-requests';
import Uuid from '../../../src/domain/value-objects/uuid';
import ValueObjectValidationError from '../../../src/domain/errors/value-object-validation-error';
import { UpdateCharacterOutput } from '../../../src/characters/dto/update-character.output';
import { RemoveCharacterOutput } from '../../../src/characters/dto/remove-character.output';

describe('GraphQL mutations to for (c)RUD operations on characters', () => {
  let app: INestApplication;
  let characterRepo: Repository<Character>;

  const startingCharacters: Array<Character> = [
    new Character('John', 'Doe'),
    new Character('Jane', 'Doe'),
  ];

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

  describe('updateCharacter', () => {
    it('should include a updateCharacter property in body.data', async () => {
      const existingUuid = startingCharacters[0].uuid;
      const newFirstName = 'Jack';
      const newLastname = 'Doe';

      await request(app.getHttpServer())
        .post('/graphql')
        .send(
          UPDATE_CHARACTER_MUTATION(existingUuid, newFirstName, newLastname),
        )
        .then((res) => {
          const data = res.body.data;

          expect(data).toHaveProperty('updateCharacter');
        });
    });

    it('should response with the uuid of the updated character', async () => {
      const existingUuid = startingCharacters[0].uuid;
      const newFirstName = 'Jack';
      const newLastname = 'Doe';

      await request(app.getHttpServer())
        .post('/graphql')
        .send(
          UPDATE_CHARACTER_MUTATION(existingUuid, newFirstName, newLastname),
        )
        .then((res) => {
          const updateCharacterOutput: UpdateCharacterOutput =
            res.body.data.updateCharacter;

          expect(updateCharacterOutput.uuid).toEqual(existingUuid);
        });
    });

    it(`should update the character's firstName and lastName`, async () => {
      const existingUuid = startingCharacters[0].uuid;
      const newFirstName = 'Jack';
      const newLastname = 'Doe';

      await request(app.getHttpServer())
        .post('/graphql')
        .send(
          UPDATE_CHARACTER_MUTATION(existingUuid, newFirstName, newLastname),
        )
        .then(async () => {
          const updatedCharacter: Character | null =
            await characterRepo.findOneBy({ uuid: existingUuid });

          expect(updatedCharacter).toBeDefined();
          expect(updatedCharacter?.firstName).toEqual(newFirstName);
          expect(updatedCharacter?.lastName).toEqual(newLastname);
        });
    });

    it(`should return a not found error if the character to update doesn't exist`, async () => {
      await request(app.getHttpServer())
        .post('/graphql')
        .send(UPDATE_CHARACTER_MUTATION(fakeUuid.value, 'John', 'Doe'))
        .then((res) => {
          const error = res.body.errors[0];

          expect(error.extensions.statusCode).toEqual(HttpStatus.NOT_FOUND);
          expect(error.extensions.code).toEqual(
            HttpStatus[HttpStatus.NOT_FOUND],
          );
        });
    });

    it(`should return a conflict error if there's already a character with this firstName-lastName combination`, async () => {
      const existingUuid = startingCharacters[0].uuid;
      const existingFirstName = startingCharacters[1].firstName;
      const existingLastName = startingCharacters[1].lastName;

      await request(app.getHttpServer())
        .post('/graphql')
        .send(
          UPDATE_CHARACTER_MUTATION(
            existingUuid,
            existingFirstName,
            existingLastName,
          ),
        )
        .then((res) => {
          const error = res.body.errors[0];

          expect(error.extensions.statusCode).toEqual(HttpStatus.CONFLICT);
          expect(error.extensions.code).toEqual(
            HttpStatus[HttpStatus.CONFLICT],
          );
        });
    });
  });

  describe('removeCharacter', () => {
    it('should include a removeCharacter property in body.data', async () => {
      const existingUuid = startingCharacters[0].uuid;

      await request(app.getHttpServer())
        .post('/graphql')
        .send(REMOVE_CHARACTER_MUTATION(existingUuid))
        .then((res) => {
          const data = res.body.data;

          expect(data).toHaveProperty('removeCharacter');
        });
    });

    it('should include the uuid of the removed character in the response', async () => {
      const existingUuid = startingCharacters[0].uuid;

      await request(app.getHttpServer())
        .post('/graphql')
        .send(REMOVE_CHARACTER_MUTATION(existingUuid))
        .then((res) => {
          const removeCharacterOutput: RemoveCharacterOutput =
            res.body.data.removeCharacter;

          expect(removeCharacterOutput.uuid).toEqual(existingUuid);
        });
    });

    it('should remove the character from the database', async () => {
      const existingUuid = startingCharacters[0].uuid;

      await request(app.getHttpServer())
        .post('/graphql')
        .send(REMOVE_CHARACTER_MUTATION(existingUuid))
        .then(() => {
          characterRepo
            .findOneBy({ uuid: existingUuid })
            .then((removedCharacter) => {
              expect(removedCharacter).toBeNull();
            });
        });
    });

    it(`should return a not found error if the character to remove doesn't exist`, async () => {
      await request(app.getHttpServer())
        .post('/graphql')
        .send(REMOVE_CHARACTER_MUTATION(fakeUuid.value))
        .then((res) => {
          const error = res.body.errors[0];

          expect(error.extensions.statusCode).toEqual(HttpStatus.NOT_FOUND);
          expect(error.extensions.code).toEqual(
            HttpStatus[HttpStatus.NOT_FOUND],
          );
        });
    });
  });
});
