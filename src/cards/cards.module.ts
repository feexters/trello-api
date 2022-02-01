import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { CardsController } from './cards.controller';
import { CardsService } from './services/cards.service';
import { CardsRepository } from './repositories/cards.repository';

@Module({
  imports: [TypeOrmModule.forFeature([CardsRepository])],
  controllers: [CardsController],
  providers: [CardsService],
})
export class CardsModule {}
