import CharacterSchemaMapper from "../../../src/presentation/mappers/character-schema.mapper";
import CharacterEntity from "../../../src/infrastructure/entities/character.entity";
import CharacterSchema from "../../../src/presentation/schemas/character.schema";
import Character from "../../../src/domain/models/character";

describe(CharacterSchemaMapper.name, () => {
    let mapper: CharacterSchemaMapper;

    beforeAll(() => {
        mapper = new CharacterSchemaMapper();
    });

    describe('toDomain', () => {
        it('should map a character-schema to a character domain class', () => {
            const id = '00000000-0000-0000-0000-000000000000';
            const firstName = 'John';
            const lastname = 'Doe';
            const schema = new CharacterSchema(id, firstName, lastname);

            const domain = mapper.toDomain(schema);
            expect(domain.uuid.value).toBe(id);
            expect(domain.firstName).toBe(firstName);
            expect(domain.lastName).toBe(lastname);
        });
    });

    describe('toSchema', () => {
        it('should map a character domain class to a character-schema', () => {
            const id = '00000000-0000-0000-0000-000000000000';
            const firstName = 'John';
            const lastname = 'Doe';
            const domain = new Character(id, firstName, lastname);

            const schema = mapper.toSchema(domain);
            expect(schema.id).toBe(id);
            expect(schema.firstName).toBe(firstName);
            expect(schema.lastName).toBe(lastname);
        });
    });

    describe('multipleToDomain', () => {
        it('should map an array of character-schemas to an array of character domain classes', () => {
            const schema1 = new CharacterSchema('00000000-0000-0000-0000-000000000000', 'John', 'Doe');
            const schema2 = new CharacterSchema('00000000-0000-0000-0000-000000000000', 'Jane', 'Doe');

            const [domain1, domain2] = mapper.multipleToDomain([schema1, schema2]);

            expect(domain1.uuid.value).toBe(schema1.id);
            expect(domain1.firstName).toBe(schema1.firstName);
            expect(domain1.lastName).toBe(schema1.lastName);

            expect(domain2.uuid.value).toBe(schema2.id);
            expect(domain2.firstName).toBe(schema2.firstName);
            expect(domain2.lastName).toBe(schema2.lastName);
        });
    });

    describe('multipleToSchema', () => {
        it('should map an array of character domain classes to an array of character-schemas', () => {
            const domain1 = new Character('00000000-0000-0000-0000-000000000000', 'John', 'Doe');
            const domain2 = new Character('00000000-0000-0000-0000-000000000000', 'Jane', 'Doe');

            const [schema1, schema2] = mapper.multipleToSchema([domain1, domain2]);

            expect(schema1.id).toBe(domain1.uuid.value);
            expect(schema1.firstName).toBe(domain1.firstName);
            expect(schema1.lastName).toBe(domain1.lastName);

            expect(schema2.id).toBe(domain2.uuid.value);
            expect(schema2.firstName).toBe(domain2.firstName);
            expect(schema2.lastName).toBe(domain2.lastName);
        });
    });
})