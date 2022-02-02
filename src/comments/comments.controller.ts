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
import { CommentCreateDto, CommentUpdateDto } from './dto';
import { Comment } from './entities/comment.entity';
import { CommentsService } from './services/comments.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CommentOwnerGuard } from './guards';
import { IAM } from 'src/common/decorators';

@ApiTags('comments')
@Controller('cards/:cardId/comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Get()
  @ApiResponse({ type: [Comment] })
  getCommentsOfCard(@Param('cardId') cardId: string) {
    return this.commentsService.getCommentsOfCard(cardId);
  }

  @Get('/:commentId')
  @ApiResponse({ type: Comment })
  getComment(
    @Param('commentId') commentId: string,
    @Param('cardId') cardId: string,
  ) {
    return this.commentsService.getComment({ commentId, cardId });
  }

  @Post()
  @ApiResponse({ type: Comment })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  createComment(
    @IAM('id') userId: string,
    @Body() commentCreateDto: CommentCreateDto,
    @Param('cardId') cardId: string,
  ) {
    return this.commentsService.createComment(commentCreateDto, {
      cardId,
      userId,
    });
  }

  @Patch('/:commentId')
  @ApiResponse({ type: Comment })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, CommentOwnerGuard)
  updateComment(
    @Body() commentUpdateDto: CommentUpdateDto,
    @Param('cardId') cardId: string,
    @Param('commentId') commentId: string,
  ) {
    return this.commentsService.updateComment(commentUpdateDto, {
      cardId,
      commentId,
    });
  }

  @Delete('/:commentId')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, CommentOwnerGuard)
  deleteComment(
    @Param('cardId') cardId: string,
    @Param('commentId') commentId: string,
  ) {
    return this.commentsService.deleteComment({
      cardId,
      commentId,
    });
  }
}
