import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class UpdateCharacterOutput {
  @Field()
  uuid: string;

  constructor(uuid: string) {
    this.uuid = uuid;
  }
}
