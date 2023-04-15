import { UpdateCharacterInput } from './update-character.input';

describe(UpdateCharacterInput.name, () => {
  it('should set uuid field correctly', () => {
    const uuid = '12345';
    const updateCharacterInput = new UpdateCharacterInput();
    updateCharacterInput.uuid = uuid;
    expect(updateCharacterInput.uuid).toEqual(uuid);
  });

  it('should set firstName field correctly - from PartialType(CreateCharacterInput)', () => {
    const firstName = 'Joe';
    const updateCharacterInput = new UpdateCharacterInput();
    updateCharacterInput.firstName = firstName;
    expect(updateCharacterInput.firstName).toEqual(firstName);
  });

  it('should set lastName field correctly - from PartialType(CreateCharacterInput)', () => {
    const lastName = 'Doe';
    const updateCharacterInput = new UpdateCharacterInput();
    updateCharacterInput.lastName = lastName;
    expect(updateCharacterInput.lastName).toEqual(lastName);
  });
});
