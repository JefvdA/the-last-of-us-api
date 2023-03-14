export default class NotFoundError extends Error {
  constructor(public readonly objectName: string) {
    super(`${objectName} was not found`);
    this.name = this.constructor.name;
  }
}
