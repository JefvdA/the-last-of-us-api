import {Field, ObjectType} from "@nestjs/graphql";

@ObjectType()
export default class CharacterUpdateResponseSchema {
    @Field()
    uuid!: string;
}