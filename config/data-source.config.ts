import { DataSource, DataSourceOptions } from 'typeorm';
require('dotenv').config();
import * as process from "process";

export const dataSourceSimpleOptions: DataSourceOptions = {
  // @ts-ignore
  type: process.env.DB_TYPE,
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT!),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE
};

const dataSourceOptions: DataSourceOptions = {
  ...dataSourceSimpleOptions,
  entities: ['dist/**/*.entity.js'],
  migrations: ['dist/migrations/*.js'],
};

const dataSourceConfig = new DataSource(dataSourceOptions);
export default dataSourceConfig;
