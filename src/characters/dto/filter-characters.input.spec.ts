import { FilterCharactersInput } from './filter-characters.input';

describe(FilterCharactersInput.name, () => {
  it('should set firstName and lastName fields correctly', () => {
    const firstName = 'John';
    const lastName = 'Doe';

    const filterCharactersInput = new FilterCharactersInput();
    filterCharactersInput.firstName = firstName;
    filterCharactersInput.lastName = lastName;

    expect(filterCharactersInput.firstName).toEqual(firstName);
    expect(filterCharactersInput.lastName).toEqual(lastName);
  });

  it('should allow firstName and lastName fields to be undefined', () => {
    const filterCharactersInput = new FilterCharactersInput();
    filterCharactersInput.firstName = undefined;
    filterCharactersInput.lastName = undefined;

    expect(filterCharactersInput.firstName).toBeUndefined();
    expect(filterCharactersInput.lastName).toBeUndefined();
  });
});
