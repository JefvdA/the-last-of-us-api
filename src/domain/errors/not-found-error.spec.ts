import NotFoundError from './not-found-error';

describe('NotFoundError', () => {
  it('should have the correct name', () => {
    const error = new NotFoundError('objectName');
    expect(error.name).toBe(error.constructor.name);
  });

  it('should have the correct message', () => {
    const error = new NotFoundError('objectName');
    expect(error.message).toBe('objectName was not found');
  });

  it('should have the correct object name', () => {
    const objectName = 'objectName';
    const error = new NotFoundError(objectName);
    expect(error.objectName).toBe(objectName);
  });
});
