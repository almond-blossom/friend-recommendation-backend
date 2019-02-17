import {
  Table, Column, Model, BelongsToMany, PrimaryKey, AutoIncrement } from 'sequelize-typescript';
import { UserFriend } from './UserFriend';

@Table
export class User extends Model<User> {
  @PrimaryKey
  @AutoIncrement
  @Column
  objectId: number;

  @Column
  id: string;

  @Column
  pass: string;

  @Column
  name: string;

  @Column
  code: string;

  @BelongsToMany(() => User, () => UserFriend, 'userId', 'friendId')
  friends: User[];

  @Column
  cash: number;
}
