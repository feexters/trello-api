import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CardsService } from './services';
import { Card } from './entities/card.entity';
import { CardCreateDto, CardUpdateDto } from './dto/cards.dto';
import { IAM } from 'src/common/decorators';
import { User } from '../users/entities/user.entity';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CardOwnerGuard } from './guards';

@ApiTags('cards')
@Controller('desk-columns/:deskColumnId/cards')
export class CardsController {
  constructor(private readonly cardsService: CardsService) {}

  @Get()
  @ApiResponse({ type: [Card] })
  getAllByColumn(@Param('deskColumnId') deskColumnId: string) {
    return this.cardsService.getAllByColumnId(deskColumnId);
  }

  @Get('/:cardId')
  @ApiResponse({ type: Card })
  getCard(
    @Param('deskColumnId') deskColumnId: string,
    @Param('cardId') cardId: string,
  ) {
    return this.cardsService.getCard({ deskColumnId, cardId });
  }

  @Post()
  @ApiResponse({ type: Card })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  createCard(
    @IAM() user: User,
    @Body() cardCreateDto: CardCreateDto,
    @Param('deskColumnId') deskColumnId: string,
  ) {
    return this.cardsService.createCard(cardCreateDto, {
      deskColumnId,
      userId: user.id,
    });
  }

  @Patch('/:cardId')
  @ApiResponse({ type: Card })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, CardOwnerGuard)
  updateCard(
    @Body() cardUpdateDto: CardUpdateDto,
    @Param('deskColumnId') deskColumnId: string,
    @Param('cardId') cardId: string,
  ) {
    return this.cardsService.updateCard(cardUpdateDto, {
      deskColumnId,
      cardId,
    });
  }

  @Delete('/:cardId')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, CardOwnerGuard)
  deleteColumn(
    @Param('deskColumnId') deskColumnId: string,
    @Param('cardId') cardId: string,
  ) {
    return this.cardsService.deleteCard({
      deskColumnId,
      cardId,
    });
  }
}
