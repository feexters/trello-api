import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { Card } from 'src/cards/entities/card.entity';

const tableName = 'desk_columns';

@Entity({
  name: tableName,
})
export class DeskColumn {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text')
  title: string;

  @ManyToOne(() => User, (user) => user.deskColumns)
  @JoinColumn({
    name: 'userId',
    referencedColumnName: 'id',
  })
  user: User;

  @OneToMany(() => Card, (card) => card.deskColumn)
  cards: Card[];
}
