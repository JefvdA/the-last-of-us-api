import { Module } from '@nestjs/common';
import { ResponsesModule } from './responses/responses.module';

@Module({
  imports: [ResponsesModule]
})
export class SchemasModule {}
