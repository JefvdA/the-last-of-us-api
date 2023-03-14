import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('characters')
export default class CharacterEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  firstName?: string;

  @Column()
  lastName?: string;

  constructor(id: string, firstName: string, lastName: string) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
  }
}
