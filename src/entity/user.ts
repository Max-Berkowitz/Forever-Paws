import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  shelter: boolean;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column()
  address: string;

  @Column()
  phone: number;

  @Column()
  email: string;
}
