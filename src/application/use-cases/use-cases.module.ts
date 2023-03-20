import { Module } from '@nestjs/common';
import CharacterUseCase from './character.use-case';
import { ServicesModule } from '../services/services.module';

const useCases: Array<any> = [CharacterUseCase];

@Module({
  imports: [ServicesModule],
  providers: useCases,
  exports: useCases,
})
export class UseCasesModule {}
