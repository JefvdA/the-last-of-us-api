import {Test} from "@nestjs/testing";
import {CharactersService} from "../../../src/infrastructure/services/characters.service";
import CharacterEntityMapper from "../../../src/infrastructure/mappers/character-entity.mapper";
import CharacterRepositoryMock from "../mocks/character.repository.mock";
import {Repository} from "typeorm";
import CharacterEntity from "../../../src/infrastructure/entities/character.entity";
import {getRepositoryToken} from "@nestjs/typeorm";
import NotFoundError from "../../../src/domain/errors/not-found-error";

describe(CharactersService.name, () => {
    let service: CharactersService;
    let repository: Repository<CharacterEntity>;
    let mapper: CharacterEntityMapper;

    beforeAll(async () => {
        const module = await Test.createTestingModule({
            providers: [CharactersService, CharacterEntityMapper, CharacterRepositoryMock]
        }).compile();

        service = module.get(CharactersService);
        repository = module.get(getRepositoryToken(CharacterEntity));
        mapper = module.get(CharacterEntityMapper);
    });

    describe('findAll', () => {
        it('should call repository.find()', async () => {
            const spy = jest.spyOn(repository, 'find');

            service.findAll().then(() => {
                expect(spy).toBeCalled();
            });
        });

        it('should call mapper.multipleToDomain()', async () => {
           const spy = jest.spyOn(mapper, 'multipleToDomain');

           service.findAll().then(() => {
               expect(spy).toBeCalled();
           })
        });
    });

    describe('findOne', () => {
       it('should call repository.findOneBy()', async () => {
          const spy = jest.spyOn(repository, 'findOneBy');

          service.findOne('').then(() => {
              expect(spy).toBeCalled();
          })
       });

       it('should call mapper.toDomain()', async () => {
          const spy = jest.spyOn(mapper, 'toDomain');

          service.findOne('').then(() => {
             expect(spy).toBeCalled();
          });
       });

        it('should throw a NotFoundError if there was no character found', async () => {
            jest.spyOn(repository, 'findOneBy').mockResolvedValueOnce(null);

            service.findOne('').catch((error) => {
               expect(error).toBeInstanceOf(NotFoundError)
            });

            jest.restoreAllMocks();
        });
    });
});