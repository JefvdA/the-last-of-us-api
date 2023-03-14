import Uuid from '../../../src/domain/value-objects/uuid';
import ValueObjectValidationError from '../../../src/domain/errors/value-object-validation-error';

describe('Uuid', () => {
  describe('constructor', () => {
    it('should throw a ValueObjectValidationError when an invalid uuid is provided', () => {
      const invalidUuid = 'invalid-uuid';
      expect(() => new Uuid(invalidUuid)).toThrowError(
        ValueObjectValidationError,
      );
      expect(() => new Uuid(invalidUuid)).toThrowError(
        'Uuid is invalid: Invalid uuid',
      );
    });

    it('should create a new instance when a valid uuid is provided', () => {
      const validUuid = '123e4567-e89b-12d3-a456-426655440000';
      const uuid = new Uuid(validUuid);
      expect(uuid).toBeDefined();
      expect(uuid).toBeInstanceOf(Uuid);
      expect(uuid.value).toBe(validUuid);
    });
  });
});
