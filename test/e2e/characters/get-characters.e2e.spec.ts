import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { testDataSourceOptions } from '../../../config/data-source.config.test';

describe('GraphQL queries to fetch characters', () => {
  beforeAll(async () => {
    const testModule: TestingModule = await Test.createTestingModule({
      imports: [TypeOrmModule.forRoot(testDataSourceOptions)],
    }).compile();
  });

  it('should setup the tests correctly', () => {
    expect(true).toBeTruthy();
  });
});
