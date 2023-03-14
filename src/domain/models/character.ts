import Uuid from '../value-objects/uuid';

export default class Character {
  id: Uuid;
  firstName?: string;
  lastName?: string;

  constructor(id: string, firstName: string, lastName: string) {
    this.id = new Uuid(id);
    this.firstName = firstName;
    this.lastName = lastName;
  }
}
