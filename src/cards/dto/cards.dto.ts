import { PickType } from '@nestjs/swagger';
import { Card } from '../entities/card.entity';

export class CardCreateDto extends PickType(Card, ['title']) {}

export class CardUpdateDto extends PickType(Card, ['title']) {}
