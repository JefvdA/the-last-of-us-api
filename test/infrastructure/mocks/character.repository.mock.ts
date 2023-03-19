import {DeepPartial, FindManyOptions, FindOptionsWhere, Repository} from "typeorm";
import {getRepositoryToken} from "@nestjs/typeorm";
import CharacterEntity from "../../../src/infrastructure/entities/character.entity";

class CharacterRepositoryMock {
    findBy(): Promise<CharacterEntity[]> {
        return Promise.resolve([
            {
                uuid: '00000000-0000-0000-0000-000000000000',
                firstName: 'John',
                lastName: 'Doe'
            }
        ]);
    }

    findOneBy(): Promise<CharacterEntity | null> {
        return Promise.resolve({
            uuid: '00000000-0000-0000-0000-000000000000',
            firstName: 'John',
            lastName: 'Doe'
        });
    }

    save(): Promise<CharacterEntity> {
        return Promise.resolve({
            uuid: '00000000-0000-0000-0000-000000000000',
            firstName: 'John',
            lastName: 'Doe'
        });
    }
}
export default {
    provide: getRepositoryToken(CharacterEntity),
    useClass: CharacterRepositoryMock
};