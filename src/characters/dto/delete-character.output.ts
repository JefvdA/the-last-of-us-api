import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class DeleteCharacterOutput {
  @Field()
  uuid: string;

  constructor(uuid: string) {
    this.uuid = uuid;
  }
}
