import { CreateCharacterInput } from './create-character.input';
import { InputType, Field, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateCharacterInput extends PartialType(CreateCharacterInput) {
  @Field()
  uuid: string;
}
