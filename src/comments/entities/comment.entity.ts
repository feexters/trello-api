import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { Card } from 'src/cards/entities/card.entity';

const tableName = 'comments';

@Entity({
  name: tableName,
})
export class Comment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text')
  comment: string;

  @ManyToOne(() => User, (user) => user.comments)
  @JoinColumn({
    name: 'userId',
    referencedColumnName: 'id',
  })
  user: User;

  @ManyToOne(() => Card, (card) => card.comments)
  @JoinColumn({
    name: 'cardId',
    referencedColumnName: 'id',
  })
  card: Card;
}
