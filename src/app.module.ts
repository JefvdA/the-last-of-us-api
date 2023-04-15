import { Module } from '@nestjs/common';
import { CharactersModule } from './characters/characters.module';
import InfrastructureModule from './infrastructure/infrastructure.module';
import PresentationModule from './presentation/presentation.module';

@Module({
  imports: [InfrastructureModule, PresentationModule, CharactersModule],
})
export default class AppModule {}
