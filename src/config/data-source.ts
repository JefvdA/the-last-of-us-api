import {DataSource, DataSourceOptions} from "typeorm";

export const dataSourceOptions: DataSourceOptions = {
    type: 'mysql',
    host: 'db',
    port: 3306,
    username: 'root',
    password: 'root',
    database: 'the-last-of-us-db',
    entities: ['dist/**/*.entity.js'],
    migrations: ['dist/migrations/*.js']
};

const dataSource = new DataSource(dataSourceOptions);
export default dataSource;