import ValueObjectValidationError from '../errors/value-object-validation-error';

export default class Uuid {
  readonly uuidRegex: RegExp =
    /^[a-f\d]{8}-[a-f\d]{4}-[a-f\d]{4}-[a-f\d]{4}-[a-f\d]{12}$/i;

  constructor(readonly value: string) {
    if (!this.isValidUuid(value))
      throw new ValueObjectValidationError('Uuid', value);
  }

  private isValidUuid(uuid: string): boolean {
    return this.uuidRegex.test(uuid);
  }
}
