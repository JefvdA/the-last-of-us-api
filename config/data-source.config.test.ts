import { DataSource, DataSourceOptions } from 'typeorm';

export const testDataSourceOptions: DataSourceOptions = {
  type: 'sqlite',
  database: ':memory:',
  entities: ['src/**/*.entity.js'],
  synchronize: true
};

const testDataSourceConfig = new DataSource(testDataSourceOptions);
export default testDataSourceConfig;
