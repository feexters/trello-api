import { Injectable, NotFoundException } from '@nestjs/common';
import { CardCreateDto, CardUpdateDto } from '../dto';
import { CardsRepository } from '../repositories/cards.repository';

@Injectable()
export class CardsService {
  constructor(private readonly cardsRepository: CardsRepository) {}

  getAllByColumnId(deskColumnId: string) {
    return this.cardsRepository.find({ deskColumnId });
  }

  getCard({ deskColumnId, cardId }: { deskColumnId: string; cardId: string }) {
    const card = this.cardsRepository.findOne({ deskColumnId, id: cardId });

    if (!card) {
      throw new NotFoundException('card not found');
    }

    return card;
  }

  createCard(
    cardCreateDto: CardCreateDto,
    { deskColumnId, userId }: { deskColumnId: string; userId: string },
  ) {
    const cardCreated = this.cardsRepository.create({
      deskColumnId,
      userId,
      ...cardCreateDto,
    });

    return this.cardsRepository.save(cardCreated);
  }

  async updateCard(
    cardUpdateDto: CardUpdateDto,
    { deskColumnId, cardId }: { deskColumnId: string; cardId: string },
  ) {
    const card = await this.getCard({ deskColumnId, cardId });

    return this.cardsRepository.save({ ...card, ...cardUpdateDto });
  }

  deleteCard({
    deskColumnId,
    cardId,
  }: {
    deskColumnId: string;
    cardId: string;
  }) {
    return this.cardsRepository.delete({ deskColumnId, id: cardId });
  }
}
