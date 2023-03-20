import CharacterEntity from '../../../src/infrastructure/entities/character.entity';

describe('CharacterEntity', () => {
  describe('constructor', () => {
    it('should create a character-entity with valid arguments', () => {
      const firstName = 'John';
      const lastName = 'Doe';
      const entity = new CharacterEntity(firstName, lastName);
      expect(entity).toBeDefined();
      expect(entity.firstName).toBe(firstName);
      expect(entity.lastName).toBe(lastName);
    });
  });
});
