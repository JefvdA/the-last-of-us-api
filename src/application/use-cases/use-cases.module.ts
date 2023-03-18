import { Module } from '@nestjs/common';
import CharacterUseCase from "./character.use-case";
import {ServicesModule} from "../../infrastructure/services/services.module";

const useCases: Array<any> = [CharacterUseCase]

@Module({
    imports: [ServicesModule],
    providers: useCases,
    exports: useCases
})
export class UseCasesModule {}
