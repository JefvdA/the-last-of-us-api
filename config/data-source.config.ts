import { DataSource, DataSourceOptions } from 'typeorm';

export const dataSourceSimpleOptions: DataSourceOptions = {
  type: 'mysql',
  host: 'db',
  port: 3306,
  username: 'root',
  password: 'root',
  database: 'the-last-of-us-db'
};

const dataSourceOptions: DataSourceOptions = {
  ...dataSourceSimpleOptions,
  entities: ['dist/**/*.entity.js'],
  migrations: ['dist/migrations/*.js'],
};

const dataSourceConfig = new DataSource(dataSourceOptions);
export default dataSourceConfig;
