import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export default class CharacterCreationResponseSchema {
  @Field()
  uuid!: string;
}
