import Uuid from '../value-objects/uuid';

export default interface CrudService<T> {
  findAll(filterOptions?: any): Promise<T[]>;

  findOne(uuid: string): Promise<T>;

  create(creationArgument: any): Promise<any>;

  update(updateArgument: any): Promise<any>;

  delete(uuid: Uuid): Promise<any>;
}
