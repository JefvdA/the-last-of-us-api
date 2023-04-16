import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken, TypeOrmModule } from '@nestjs/typeorm';
import { testDataSourceOptions } from '../../../config/data-source.config.test';
import { Character } from '../../../src/characters/entities/character.entity';
import { Repository } from 'typeorm';

describe('GraphQL queries to fetch characters', () => {
  let characterRepo: Repository<Character>;

  const startingCharacters: Array<Character> = [
    new Character('John', 'Doe'),
    new Character('Jane', 'Doe'),
  ];

  beforeAll(async () => {
    const testModule: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot(testDataSourceOptions),
        TypeOrmModule.forFeature([Character]),
      ],
    }).compile();

    characterRepo = testModule.get<Repository<Character>>(
      getRepositoryToken(Character),
    );
  });

  beforeEach(async () => {
    await characterRepo.clear();
    await characterRepo.save(startingCharacters);
  });

  it('should setup the tests correctly', () => {
    expect(true).toBeTruthy();
  });
});
