import { CreateCharacterInput } from './create-character.input';

describe(CreateCharacterInput.name, () => {
  it('should set the firstName and lastName fields correctly', () => {
    const firstName = 'John';
    const lastName = 'Doe';

    const createCharacterInput = new CreateCharacterInput();
    createCharacterInput.firstName = firstName;
    createCharacterInput.lastName = lastName;

    expect(createCharacterInput.firstName).toEqual(firstName);
    expect(createCharacterInput.lastName).toEqual(lastName);
  });
});
