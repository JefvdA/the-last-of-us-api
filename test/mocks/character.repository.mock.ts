import { DeleteResult, InsertResult, UpdateResult } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import CharacterEntity from '../../src/infrastructure/entities/character.entity';

class CharacterRepositoryMock {
  findBy(): Promise<CharacterEntity[]> {
    return Promise.resolve([
      {
        uuid: '00000000-0000-0000-0000-000000000000',
        firstName: 'John',
        lastName: 'Doe',
      },
    ]);
  }

  findOneBy(): Promise<CharacterEntity | null> {
    return Promise.resolve({
      uuid: '00000000-0000-0000-0000-000000000000',
      firstName: 'John',
      lastName: 'Doe',
    });
  }

  insert(): Promise<InsertResult> {
    const result = new InsertResult();
    result.identifiers.push({
      uuid: '00000000-0000-0000-0000-000000000000',
    });

    return Promise.resolve(result);
  }

  update(): Promise<UpdateResult> {
    const result = new UpdateResult();

    return Promise.resolve(result);
  }

  delete(): Promise<DeleteResult> {
    const result = new DeleteResult();

    return Promise.resolve(result);
  }
}
export default {
  provide: getRepositoryToken(CharacterEntity),
  useClass: CharacterRepositoryMock,
};
