import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { DeskColumn } from 'src/desk-columns/entities/desk-column.entity';
import { Card } from 'src/cards/entities/card.entity';
import { Comment } from 'src/comments/entities/comment.entity';
import { IsEmail, IsString, Length } from 'class-validator';

const tableName = 'users';

@Entity({
  name: tableName,
})
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @IsString()
  @Length(4, 36)
  @Column('text', { unique: true })
  username: string;

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
