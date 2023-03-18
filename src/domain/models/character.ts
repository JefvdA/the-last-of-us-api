import Uuid from '../value-objects/uuid';

export default class Character {
  uuid: Uuid;
  firstName: string;
  lastName: string;

  constructor(uuid: string, firstName: string, lastName: string) {
    this.uuid = new Uuid(uuid);
    this.firstName = firstName;
    this.lastName = lastName;
  }
}
