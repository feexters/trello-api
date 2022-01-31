import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { DeskColumn } from 'src/desk-columns/entities/desk-column.entity';
import { Card } from 'src/cards/entities/card.entity';
import { Comment } from 'src/comments/entities/comment.entity';
import { IsEmail, IsString, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

const tableName = 'users';

@Entity({
  name: tableName,
})
export class User {
  @ApiProperty({ example: 'cf61390c-36bc-4c0b-954b-da303258d472' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ example: 'user1', minLength: 4, maxLength: 36 })
  @IsString()
  @Length(4, 36)
  @Column('text', { unique: true })
  username: string;

  @ApiProperty({ example: 'example@gmail.com' })
  @ApiProperty()
  @IsEmail()
  @Column('text', { unique: true })
  email: string;

  @IsString()
  @Length(6, 24)
  @Column({ type: 'text', select: false, nullable: true })
  password: string;

  @OneToMany(() => DeskColumn, (deskColumn) => deskColumn.user)
  deskColumns: DeskColumn[];

  @OneToMany(() => Card, (card) => card.user)
  cards: Card[];

  @OneToMany(() => Comment, (comment) => comment.user)
  comments: Comment[];
}
