import CharacterSchema from '../../../src/presentation/schemas/character.schema';

describe(CharacterSchema.name, () => {
  describe('constructor', () => {
    it('should create a character-schema with valid arguments', () => {
      const id = '00000000-0000-0000-0000-000000000000';
      const firstName = 'John';
      const lastName = 'Doe';
      const schema = new CharacterSchema(id, firstName, lastName);
      expect(schema).toBeDefined();
      expect(schema.id).toBe(id);
      expect(schema.firstName).toBe(firstName);
      expect(schema.lastName).toBe(lastName);
    });
  });
});
