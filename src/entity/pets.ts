import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Pets {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  adoptable: boolean;

  @Column()
  name: string;

  @Column()
  UserID: string;

  @Column()
  likeCounter: number;

  @Column()
  caption: string;

  @Column()
  breed: string;

  @Column()
  weight: number;
}
