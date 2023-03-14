import { Module } from '@nestjs/common';
import { ResolversModule } from './resolvers/resolvers.module';

@Module({
  imports: [ResolversModule],
})
export class PresentationModule {}
