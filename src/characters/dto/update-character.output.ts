import { Field, ObjectType } from '@nestjs/graphql';
import Uuid from '../../domain/value-objects/uuid';

@ObjectType()
export class UpdateCharacterOutput {
  @Field()
  uuid: string;

  constructor(uuid: Uuid) {
    this.uuid = uuid.value;
  }
}
