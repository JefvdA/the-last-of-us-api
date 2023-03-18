import {Injectable} from "@nestjs/common";
import {CharacterService} from "../services/character.service";
import Character from "../../domain/models/character";
import Uuid from "../../domain/value-objects/uuid";
import CharacterFilterOptionsArgument from "../arguments/character/character-filter-options.argument";
import CharacterCreationArgument from "../arguments/character/CharacterCreationArgument";

@Injectable()
export default class CharacterUseCase {
    constructor(
        private readonly characterService: CharacterService
    ) {}

    findAll(filterOptions?: CharacterFilterOptionsArgument): Promise<Character[]> {
        return this.characterService.findAll(filterOptions);
    }

    findOne(uuid: Uuid): Promise<Character> {
        return this.characterService.findOne(uuid.value);
    }

    createCharacter(character: CharacterCreationArgument): Promise<Character> {
        return Promise.resolve(new Character(
            '00000000-0000-0000-0000-000000000000',
            character.firstName,
            character.lastName
        ));
    }
}