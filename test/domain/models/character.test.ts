import Character from '../../../src/domain/models/character';
import Uuid from '../../../src/domain/value-objects/uuid';
import ValueObjectValidationError from '../../../src/domain/errors/value-object-validation-error';

describe('Character', () => {
  describe('constructor', () => {
    it('should create a character with valid arguments', () => {
      const characterId = '123e4567-e89b-12d3-a456-426655440000';
      const firstName = 'John';
      const lastName = 'Doe';
      const character = new Character(characterId, firstName, lastName);
      expect(character).toBeDefined();
      expect(character.uuid).toBeInstanceOf(Uuid);
      expect(character.uuid.value).toBe(characterId);
      expect(character.firstName).toBe(firstName);
      expect(character.lastName).toBe(lastName);
    });

    it('should throw a ValueObjectValidationError when creating a character with invalid id', () => {
      const characterId = 'invalid id';
      const firstName = 'John';
      const lastName = 'Doe';
      expect(() => new Character(characterId, firstName, lastName)).toThrow(
        ValueObjectValidationError,
      );
    });
  });
});
