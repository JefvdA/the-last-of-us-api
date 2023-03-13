import ValueObjectValidationError from "../../../src/domain/errors/value-object-validation-error";

describe('InvalidValueObjectError', () => {
    it('should have the correct name', () => {
        const error = new ValueObjectValidationError('propertyName', 'errorMessage');
        expect(error.name).toBe('InvalidValueObjectError');
    });

    it('should have the correct message', () => {
        const error = new ValueObjectValidationError('propertyName', 'errorMessage');
        expect(error.message).toBe('propertyName is invalid: errorMessage');
    });

    it('should have the correct property name and error message', () => {
        const propertyName = 'propertyName';
        const errorMessage = 'errorMessage';
        const error = new ValueObjectValidationError(propertyName, errorMessage);
        expect(error.propertyName).toBe(propertyName);
        expect(error.errorMessage).toBe(errorMessage);
    });
});
