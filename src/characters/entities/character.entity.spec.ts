import { Character } from './character.entity';

describe(Character.name, () => {
  it('should set the firstName and lastName fields correctly', () => {
    const firstName = 'Joe';
    const lastName = 'Doe';
    const character = new Character(firstName, lastName);
    expect(character.firstName).toEqual(firstName);
    expect(character.lastName).toEqual(lastName);
  });
});
