import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CardsRepository } from '../repositories/cards.repository';

@Injectable()
export class CardOwnerGuard implements CanActivate {
  constructor(
    @InjectRepository(CardsRepository)
    private readonly cardsRepository: CardsRepository,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    const isOwner = await this.cardsRepository.isCardOwner(
      request.params.cardId,
      request.user.id,
    );

    if (!isOwner) {
      throw new ForbiddenException();
    }

    return isOwner;
  }
}
