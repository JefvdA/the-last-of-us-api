export default class ValueObjectValidationError extends Error {
  constructor(
    public readonly propertyName: string,
    public readonly errorMessage: string,
  ) {
    super(`${propertyName} is invalid: ${errorMessage}`);
    this.name = this.constructor.name;
  }
}
