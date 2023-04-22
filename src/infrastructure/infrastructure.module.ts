import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as process from 'process';
import { testDataSourceOptions } from '../../config/data-source.config.test';
import { dataSourceSimpleOptions } from '../../config/data-source.config';

const typeOrmConfig =
  process.env.NODE_ENV === 'test'
    ? testDataSourceOptions
    : {
        ...dataSourceSimpleOptions,
        autoLoadEntities: true,
      };

@Module({
  imports: [TypeOrmModule.forRoot(typeOrmConfig)],
})
export default class InfrastructureModule {}
