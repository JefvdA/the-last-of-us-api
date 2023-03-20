import {Injectable} from "@nestjs/common";
import {CharacterService} from "../services/character.service";
import Character from "../../domain/models/character";
import Uuid from "../../domain/value-objects/uuid";
import CharacterFilterOptionsArgument from "../arguments/character/character-filter-options.argument";
import CharacterCreationArgument from "../arguments/character/character-creation.argument";
import CharacterCreationDto from "../dtos/character/character-creation.dto";
import CharacterUpdateArgument from "../arguments/character/character-update.argument";
import CharacterUpdateDto from "../dtos/character/character-update.dto";

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

    create(character: CharacterCreationArgument): Promise<CharacterCreationDto> {
        return this.characterService.create(character);
    }

    update(character: CharacterUpdateArgument): Promise<CharacterUpdateDto> {
        return this.characterService.update(character)
    }
}