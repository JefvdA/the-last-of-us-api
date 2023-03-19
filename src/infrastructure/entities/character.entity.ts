import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('characters')
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
