import { Table, Column, Model, ForeignKey, PrimaryKey, AutoIncrement } from 'sequelize-typescript';
import { User } from './User';

@Table
export class UserFriend extends Model<UserFriend> {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @Column
  userId: string;

  @Column
  friendId: string;
}
