import { RemoveCharacterOutput } from './remove-character.output';
import Uuid from '../../domain/value-objects/uuid';

describe(RemoveCharacterOutput.name, () => {
  it('should have a uuid field', () => {
    const uuidValue = '123e4567-e89b-12d3-a456-426655440000';
    const uuid = new Uuid(uuidValue);

    const deleteCharacterOutput = new RemoveCharacterOutput(uuid);

    expect(deleteCharacterOutput.hasOwnProperty('uuid')).toBeTruthy();
  });

  it('should set the uuid field correctly', () => {
    const uuidValue = '123e4567-e89b-12d3-a456-426655440000';
    const uuid = new Uuid(uuidValue);

    const deleteCharacterOutput = new RemoveCharacterOutput(uuid);

    expect(deleteCharacterOutput.uuid).toEqual(uuidValue);
  });
});
