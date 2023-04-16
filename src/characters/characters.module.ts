import { Module } from '@nestjs/common';
import { CharactersService } from './characters.service';
import { CharactersResolver } from './characters.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Character } from './entities/character.entity';

@Module({
  providers: [CharactersResolver, CharactersService],
  imports: [TypeOrmModule.forFeature([Character])],
})
export class CharactersModule {}
