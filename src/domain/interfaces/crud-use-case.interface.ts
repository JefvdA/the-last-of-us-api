import Uuid from "../value-objects/uuid";

export default interface CrudUseCase<T> {
    findAll(filterOptions?: any): Promise<T[]>;

    findOne(uuid: Uuid): Promise<T>;

    create(creationArgument: any): Promise<any>;

    update(updateArgument: any): Promise<any>;
}