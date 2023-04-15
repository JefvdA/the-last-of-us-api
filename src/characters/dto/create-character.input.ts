import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateCharacterInput {
  @Field()
  firstName: string;

  @Field()
  lastName: string;
}
