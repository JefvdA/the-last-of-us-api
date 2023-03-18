import {InputType, Field} from "@nestjs/graphql";

@InputType()
export default class CharacterFilterOptionsArgumentSchema {
    @Field({ nullable: true })
    firstName?: string;

    @Field({ nullable: true })
    lastName?: string;
}