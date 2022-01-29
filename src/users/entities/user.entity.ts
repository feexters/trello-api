import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { DeskColumn } from 'src/desk-columns/entities/desk-column.entity';
import { Card } from 'src/cards/entities/card.entity';
import { Comment } from 'src/comments/entities/comment.entity';

const tableName = 'users';

@Entity({
  name: tableName,
})
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text')
  username: string;

  @Column('text')
  email: string;

  @Column('text')
  password: string;

  @OneToMany(() => DeskColumn, (deskColumn) => deskColumn.user)
  deskColumns: DeskColumn[];

  @OneToMany(() => Card, (card) => card.user)
  cards: Card[];

  @OneToMany(() => Comment, (comment) => comment.user)
  comments: Comment[];
}
