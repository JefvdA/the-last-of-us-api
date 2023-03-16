import {CharactersResolver} from "../../../src/presentation/resolvers/characters.resolver";
import {Test} from "@nestjs/testing";
import {CharactersService} from "../../../src/infrastructure/services/characters.service";
import CharacterSchemaMapper from "../../../src/presentation/mappers/character-schema.mapper";
import CharactersServiceMock from "../mocks/characters.service.mock";
import CharacterSchema from "../../../src/presentation/schemas/character.schema";

describe(CharactersResolver.name, () => {
    let resolver: CharactersResolver;
    let service: CharactersService;
    let mapper: CharacterSchemaMapper;

    beforeAll(async () => {
       const module = await Test.createTestingModule({
           providers: [CharactersResolver, CharacterSchemaMapper, CharactersServiceMock]
       }).compile();

       resolver = module.get(CharactersResolver);
       service = module.get(CharactersService);
       mapper = module.get(CharacterSchemaMapper);
    });

    describe('characters', () => {
       it('should call service.findAll()', async () => {
           const spy = jest.spyOn(service, 'findAll');

           resolver.characters().then((result) => {
               expect(spy).toBeCalled();
           });
       });

       it('should call mapper.multipleToSchema()', async () => {
          const spy = jest.spyOn(mapper, 'multipleToSchema');

          resolver.characters().then((result) => {
              expect(spy).toBeCalled();
          });
       });
    });

    describe('character', () => {
       it('should call service.findOne()', async () => {
           const spy = jest.spyOn(service, 'findOne');

           resolver.character('').then(() => {
              expect(spy).toBeCalled();
           });
       });

       it('should call mapper.toSchema()', async () => {
          const spy = jest.spyOn(mapper, 'toSchema');

          resolver.character('').then(() => {
             expect(spy).toBeCalled();
          });
       });
    });
});