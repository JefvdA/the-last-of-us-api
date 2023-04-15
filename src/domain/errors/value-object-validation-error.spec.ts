import ValueObjectValidationError from './value-object-validation-error';

describe('InvalidValueObjectError', () => {
  it('should have the correct name', () => {
    const error = new ValueObjectValidationError(
      'propertyName',
      'propertyValue',
    );
    expect(error.name).toBe(error.constructor.name);
  });

  it('should have the correct message', () => {
    const error = new ValueObjectValidationError(
      'propertyName',
      'propertyValue',
    );
    expect(error.message).toBe(
      'propertyValue is an invalid value for propertyName',
    );
  });

  it('should have the correct property name and error message', () => {
    const propertyName = 'propertyName';
    const propertyValue = 'propertyValue';
    const error = new ValueObjectValidationError(propertyName, propertyValue);
    expect(error.propertyName).toBe(propertyName);
    expect(error.propertyValue).toBe(propertyValue);
  });
});
