import CharacterUseCase from "../../../src/application/use-cases/character.use-case";
import {CharacterService} from "../../../src/application/services/character.service";
import {Test} from "@nestjs/testing";
import CharacterEntityMapper from "../../../src/infrastructure/mappers/character-entity.mapper";
import Uuid from "../../../src/domain/value-objects/uuid";
import CharacterServiceMock from "../../presentation/mocks/character.service.mock";

describe(CharacterUseCase.name, () => {
   let useCase: CharacterUseCase;
   let service: CharacterService;

   beforeAll(async () => {
      const module = await Test.createTestingModule({
         providers: [CharacterUseCase, CharacterServiceMock, CharacterEntityMapper]
      }).compile();

      useCase = module.get(CharacterUseCase);
      service = module.get(CharacterService);
   });

   describe('findAll', () => {
      it('should call service.findAll()', () => {
         const spy = jest.spyOn(service, 'findAll');

         useCase.findAll().then(() => {
            expect(spy).toBeCalled();
         });
      });
   });

   describe('findOne', () => {
      it('should call service.findOne()', () => {
         const spy = jest.spyOn(service, 'findOne');

         useCase.findOne(new Uuid('00000000-0000-0000-0000-000000000000')).then(() => {
            expect(spy).toBeCalled();
         });
      });
   });

   describe('createCharacter', () => {
      it('should call service.createCharacter', () => {
         const spy = jest.spyOn(service, 'create');

         useCase.create({
            firstName: 'John',
            lastName: 'Doe'
         });

         expect(spy).toBeCalled();
      });
   });
});