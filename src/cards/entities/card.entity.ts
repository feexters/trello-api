import { User } from 'src/users/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { DeskColumn } from 'src/desk-columns/entities/desk-column.entity';
import { Comment } from '../../comments/entities/comment.entity';

const tableName = 'cards';

@Entity({
  name: tableName,
})
export class Card {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text')
  title: string;

  @ManyToOne(() => User, (user) => user.cards)
  @JoinColumn({
    name: 'userId',
    referencedColumnName: 'id',
  })
  user: User;

  @ManyToOne(() => DeskColumn, (deskColumn) => deskColumn.cards)
  @JoinColumn({
    name: 'deskColumnId',
    referencedColumnName: 'id',
  })
  deskColumn: DeskColumn;

  @OneToMany(() => Comment, (comment) => comment.card)
  comments: Comment;
}
