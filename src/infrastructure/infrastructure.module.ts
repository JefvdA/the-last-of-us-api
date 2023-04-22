import { Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as process from 'process';
import { testDataSourceOptions } from '../../config/data-source.config.test';

const typeOrmConfig =
  process.env.NODE_ENV === 'test'
    ? testDataSourceOptions
    : ({
        type: 'mysql',
        host: 'db',
        port: 3306,
        username: 'root',
        password: 'root',
        database: 'the-last-of-us-db',
        autoLoadEntities: true,
      } as TypeOrmModuleOptions);

@Module({
  imports: [TypeOrmModule.forRoot(typeOrmConfig)],
})
export default class InfrastructureModule {}
