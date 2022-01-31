import { PickType } from '@nestjs/swagger';
import { DeskColumn } from '../entities/desk-column.entity';

export class DeskColumnCreateDto extends PickType(DeskColumn, ['title']) {}

export class DeskColumnUpdateDto extends PickType(DeskColumn, ['title']) {}
