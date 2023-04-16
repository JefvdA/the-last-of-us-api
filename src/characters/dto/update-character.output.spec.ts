import { UpdateCharacterOutput } from './update-character.output';
import Uuid from '../../domain/value-objects/uuid';

describe(UpdateCharacterOutput.name, () => {
  it('should have uuid field', () => {
    const uuid = new Uuid('123e4567-e89b-12d3-a456-426655440000');
    const updateCharacterOutput = new UpdateCharacterOutput(uuid);
    expect(updateCharacterOutput).toHaveProperty('uuid');
  });

  it('should set uuid field correctly', () => {
    const uuid = new Uuid('123e4567-e89b-12d3-a456-426655440000');
    const updateCharacterOutput = new UpdateCharacterOutput(uuid);
    expect(updateCharacterOutput.uuid).toEqual(uuid.value);
  });
});
