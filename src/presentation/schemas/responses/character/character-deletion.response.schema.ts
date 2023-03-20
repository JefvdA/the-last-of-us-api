import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export default class CharacterDeletionResponseSchema {
  @Field()
  uuid!: string;
}
