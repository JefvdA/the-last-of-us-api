import { Module } from '@nestjs/common';
import CharacterSchemaMapper from "./character-schema.mapper";

const mappers: Array<any> = [CharacterSchemaMapper];

@Module({
    providers: mappers,
    exports: mappers
})
export class MappersModule {}
