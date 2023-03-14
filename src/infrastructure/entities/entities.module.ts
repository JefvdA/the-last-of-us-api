import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import CharacterEntity from './character.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CharacterEntity])],
  exports: [TypeOrmModule],
})
export class EntitiesModule {}
