import {Column, Entity, PrimaryGeneratedColumn, Unique} from 'typeorm';

@Entity('characters')
@Unique(['firstName', 'lastName'])
export default class CharacterEntity {
  @PrimaryGeneratedColumn('uuid')
  uuid: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  constructor(firstName: string, lastName: string) {
    this.firstName = firstName;
    this.lastName = lastName;
  }
}
