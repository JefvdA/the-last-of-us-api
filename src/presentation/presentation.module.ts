import { Module } from '@nestjs/common';
import { ResolversModule } from './resolvers/resolvers.module';
import { SchemasModule } from './schemas/schemas.module';
import { MappersModule } from './mappers/mappers.module';

@Module({
  imports: [ResolversModule, SchemasModule, MappersModule],
})
export class PresentationModule {}
