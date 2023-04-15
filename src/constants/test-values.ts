import { CreateCharacterInput } from '../characters/dto/create-character.input';
import { FilterCharactersInput } from '../characters/dto/filter-characters.input';
import { UpdateCharacterInput } from '../characters/dto/update-character.input';
import Uuid from '../domain/value-objects/uuid';

export const emptyPromise = new Promise(() => undefined);

export const testUuid = new Uuid('44241dba-6b16-4516-9e37-793e104da01d');

export const testCreateCharacterInput = new CreateCharacterInput();
testCreateCharacterInput.firstName = 'John';
testCreateCharacterInput.lastName = 'Doe';

export const testFilterCharactersInput = new FilterCharactersInput();
testFilterCharactersInput.firstName = 'John';
testFilterCharactersInput.lastName = 'Doe';

export const testUpdateCharacterInput = new UpdateCharacterInput();
testUpdateCharacterInput.uuid = testUuid.value;
testUpdateCharacterInput.firstName = 'Joe';
testUpdateCharacterInput.lastName = 'Doe';
