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
import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

const tableName = 'cards';

@Entity({
  name: tableName,
})
export class Card {
  @ApiProperty({ example: 'cf61390c-36bc-4c0b-954b-da303258d472' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ example: 'card title' })
  @IsString()
  @Column('text')
  title: string;

  @ApiProperty({ example: 'cf61390c-36bc-4c0b-954b-da303258d472' })
  @Column('uuid')
  userId: string;

  @ApiProperty({ example: 'cf61390c-36bc-4c0b-954b-da303258d472' })
  @Column('uuid')
  deskColumnId: string;

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
