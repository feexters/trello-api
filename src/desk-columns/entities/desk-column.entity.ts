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
import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

const tableName = 'desk_columns';

@Entity({
  name: tableName,
})
export class DeskColumn {
  @ApiProperty({ example: 'cf61390c-36bc-4c0b-954b-da303258d472' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ example: 'column title' })
  @IsString()
  @Column('text')
  title: string;

  @ApiProperty({ example: 'cf61390c-36bc-4c0b-954b-da303258d472' })
  @Column('uuid')
  userId: string;

  @ManyToOne(() => User, (user) => user.deskColumns)
  @JoinColumn({
    name: 'userId',
    referencedColumnName: 'id',
  })
  user: User;

  @OneToMany(() => Card, (card) => card.deskColumn)
  cards: Card[];
}
