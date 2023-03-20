export default interface Service<T> {
    findAll(filterOptions?: any): Promise<T[]>;

    findOne(uuid: string): Promise<T>;

    create(creationArgument: any): Promise<any>;

    update(updateArgument: any): Promise<any>;
}