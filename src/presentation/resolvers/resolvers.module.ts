import { Module } from '@nestjs/common';
import { CharactersResolver } from './characters.resolver';
import { ServicesModule } from '../../infrastructure/services/services.module';

const resolvers: Array<any> = [CharactersResolver];

@Module({
  imports: [ServicesModule],
  providers: resolvers,
  exports: resolvers,
})
export class ResolversModule {}
