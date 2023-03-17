import {Injectable} from "@nestjs/common";
import {CharacterService} from "../../infrastructure/services/character.service";
import Character from "../../domain/models/character";
import Uuid from "../../domain/value-objects/uuid";

@Injectable()
export default class CharacterUseCase {
    constructor(
        private readonly characterService: CharacterService
    ) {}

    findAll(): Promise<Character[]> {
        return this.characterService.findAll();
    }

    findOne(id: Uuid): Promise<Character> {
        return this.characterService.findOne(id.value);
    }
}