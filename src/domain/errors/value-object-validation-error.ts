export default class ValueObjectValidationError extends Error {
  constructor(
    public readonly propertyName: string,
    public readonly propertyValue: any,
  ) {
    super(`${propertyValue} is an invalid value for ${propertyName}`);
    this.name = this.constructor.name;
  }
}
