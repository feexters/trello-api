import { EntityRepository, Repository } from 'typeorm';
import { Card } from '../entities/card.entity';

@EntityRepository(Card)
export class CardsRepository extends Repository<Card> {
  async isCardOwner(cardId: string, userId: string) {
    const card = await this.findOne({ id: cardId, userId });

    if (!card) {
      return false;
    }

    return true;
  }
}
