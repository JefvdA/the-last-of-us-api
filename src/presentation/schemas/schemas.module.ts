import { Module } from '@nestjs/common';
import ResponsesModule from './responses/responses.module';
import ArgumentsModule from './arguments/arguments.module';

@Module({
  imports: [ArgumentsModule, ResponsesModule],
})
export default class SchemasModule {}
