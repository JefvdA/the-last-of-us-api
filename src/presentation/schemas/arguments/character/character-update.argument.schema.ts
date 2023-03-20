import { Field, InputType } from '@nestjs/graphql';

@InputType()
export default class CharacterUpdateArgumentSchema {
  @Field()
  uuid!: string;

  @Field()
  firstName!: string;

  @Field()
  lastName!: string;
}
