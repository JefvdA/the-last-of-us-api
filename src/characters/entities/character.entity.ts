import { ObjectType, Field } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn, Unique } from 'typeorm';

@ObjectType()
@Entity('characters')
@Unique(['firstName', 'lastName'])
export class Character {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  uuid: string;

  @Field()
  @Column()
  firstName: string;

  @Field()
  @Column()
  lastName: string;

  constructor(firstName: string, lastName: string) {
    this.firstName = firstName;
    this.lastName = lastName;
  }
}
