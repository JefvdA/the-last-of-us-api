import {CharacterResolver} from "../../../src/presentation/resolvers/character.resolver";
import {Test} from "@nestjs/testing";
import {CharacterService} from "../../../src/infrastructure/services/character.service";
import CharacterSchemaMapper from "../../../src/presentation/mappers/character-schema.mapper";
import CharactersServiceMock from "../mocks/character.service.mock";
import CharacterSchema from "../../../src/presentation/schemas/character.schema";

describe(CharacterResolver.name, () => {
    let resolver: CharacterResolver;
    let service: CharacterService;
    let mapper: CharacterSchemaMapper;

    beforeAll(async () => {
       const module = await Test.createTestingModule({
           providers: [CharacterResolver, CharacterSchemaMapper, CharactersServiceMock]
       }).compile();

       resolver = module.get(CharacterResolver);
       service = module.get(CharacterService);
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