import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class Character {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
