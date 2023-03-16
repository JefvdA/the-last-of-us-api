import CharacterEntityMapper from "../../../src/infrastructure/mappers/character-entity.mapper";
import CharacterEntity from "../../../src/infrastructure/entities/character.entity";

describe(CharacterEntityMapper.name, () => {
    let mapper: CharacterEntityMapper;

    beforeAll(() => {
       mapper = new CharacterEntityMapper();
    });

    describe('toDomain', () => {
        it('should map a character-entity to a character domain class', () => {
            const id = '00000000-0000-0000-0000-000000000000';
            const firstName = 'John';
            const lastname = 'Doe';
            const entity = new CharacterEntity(firstName, lastname);
            Object.defineProperty(entity, 'id', { value: id });

            const domain = mapper.toDomain(entity);
            expect(domain.id.value).toBe(id);
            expect(domain.firstName).toBe(firstName);
            expect(domain.lastName).toBe(lastname);
        })
    })

    describe('multipleToDomain', () => {
       it('should map an array of character-entities to an array of character domain classes', () => {
           const entity1 = new CharacterEntity('John', 'Doe');
           Object.defineProperty(entity1, 'id', { value: '00000000-0000-0000-0000-000000000000' });

           const entity2 = new CharacterEntity('Jane', 'Doe');
           Object.defineProperty(entity2, 'id', { value: '00000000-0000-0000-0000-000000000000' });

           const [domain1, domain2] = mapper.multipleToDomain([entity1, entity2]);

           expect(domain1.id.value).toBe(entity1.id);
           expect(domain1.firstName).toBe(entity1.firstName);
           expect(domain1.lastName).toBe(entity1.lastName);

           expect(domain2.id.value).toBe(entity2.id);
           expect(domain2.firstName).toBe(entity2.firstName);
           expect(domain2.lastName).toBe(entity2.lastName);
       });
    });
})