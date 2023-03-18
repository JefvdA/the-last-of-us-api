import {CharacterResolver} from "../../../src/presentation/resolvers/character.resolver";
import {Test} from "@nestjs/testing";
import {CharacterService} from "../../../src/application/services/character.service";
import CharacterSchemaMapper from "../../../src/presentation/mappers/character-schema.mapper";
import CharactersServiceMock from "../mocks/character.service.mock";
import CharacterSchema from "../../../src/presentation/schemas/character.schema";
import CharacterUseCaseMock from "../mocks/character.use-case.mock";
import CharacterUseCase from "../../../src/application/use-cases/character.use-case";

describe(CharacterResolver.name, () => {
    let resolver: CharacterResolver;
    let useCase: CharacterUseCase;
    let mapper: CharacterSchemaMapper;

    beforeAll(async () => {
       const module = await Test.createTestingModule({
           providers: [CharacterResolver, CharacterSchemaMapper, CharacterUseCaseMock]
       }).compile();

       resolver = module.get(CharacterResolver);
       useCase = module.get(CharacterUseCase);
       mapper = module.get(CharacterSchemaMapper);
    });

    describe('characters', () => {
       it('should call useCase.findAll()', async () => {
           const spy = jest.spyOn(useCase, 'findAll');

           resolver.characters().then(() => {
               expect(spy).toBeCalled();
           });
       });

       it('should call mapper.multipleToSchema()', async () => {
          const spy = jest.spyOn(mapper, 'multipleToSchema');

          resolver.characters().then(() => {
              expect(spy).toBeCalled();
          });
       });
    });

    describe('character', () => {
       it('should call useCase.findOne()', async () => {
           const spy = jest.spyOn(useCase, 'findOne');

           resolver.character('00000000-0000-0000-0000-000000000000').then(() => {
              expect(spy).toBeCalled();
           });
       });

       it('should call mapper.toSchema()', async () => {
          const spy = jest.spyOn(mapper, 'toSchema');

          resolver.character('00000000-0000-0000-0000-000000000000').then(() => {
             expect(spy).toBeCalled();
          });
       });
    });
});