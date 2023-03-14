import { Module } from '@nestjs/common';
import CharacterEntityMapper from "./character-entity.mapper";

const mappers: Array<any> = [CharacterEntityMapper];
@Module({
    providers: mappers,
    exports: mappers
})
export class MappersModule {}
