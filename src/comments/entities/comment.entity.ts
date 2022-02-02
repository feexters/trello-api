import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { Card } from 'src/cards/entities/card.entity';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

const tableName = 'comments';

@Entity({
  name: tableName,
})
export class Comment {
  @ApiProperty({ example: 'cf61390c-36bc-4c0b-954b-da303258d472' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ example: 'comment text' })
  @IsNotEmpty()
  @IsString()
  @Column('text')
  comment: string;

  @ApiProperty({ example: 'cf61390c-36bc-4c0b-954b-da303258d472' })
  @Column('uuid')
  userId: string;

  @ApiProperty({ example: 'cf61390c-36bc-4c0b-954b-da303258d472' })
  @Column('uuid')
  cardId: string;

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
