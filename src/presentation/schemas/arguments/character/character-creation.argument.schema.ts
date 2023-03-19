import {Field, InputType} from "@nestjs/graphql";

@InputType()
export default class CharacterCreationArgumentSchema {
    @Field()
    firstName!: string;

    @Field()
    lastName!: string;
}