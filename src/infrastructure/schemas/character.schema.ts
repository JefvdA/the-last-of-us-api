import {Field, ObjectType} from "@nestjs/graphql";

@ObjectType()
export default class CharacterSchema {
    @Field()
    id: string;

    @Field({ nullable: true })
    firstName?: string;

    @Field({ nullable: true })
    lastName?: string;

    constructor(id: string, firstName: string, lastName: string) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
    }
}