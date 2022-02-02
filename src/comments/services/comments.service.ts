import { Injectable, NotFoundException } from '@nestjs/common';
import { CommentCreateDto, CommentUpdateDto } from '../dto';
import { CommentsRepository } from '../repositories/comments.repository';

@Injectable()
export class CommentsService {
  constructor(private readonly commentsRepository: CommentsRepository) {}

  getCommentsOfCard(cardId: string) {
    return this.commentsRepository.find({ cardId });
  }

  getComment({ commentId, cardId }: { commentId: string; cardId: string }) {
    const comment = this.commentsRepository.findOne({ cardId, id: commentId });

    if (!comment) {
      throw new NotFoundException('comment not found');
    }

    return comment;
  }

  createComment(
    commentCreateDto: CommentCreateDto,
    { cardId, userId }: { cardId: string; userId: string },
  ) {
    const commentCreated = this.commentsRepository.create({
      cardId,
      userId,
      ...commentCreateDto,
    });

    return this.commentsRepository.save(commentCreated);
  }

  async updateComment(
    commentUpdateDto: CommentUpdateDto,
    { commentId, cardId }: { commentId: string; cardId: string },
  ) {
    const comment = await this.getComment({ commentId, cardId });

    return this.commentsRepository.save({ ...comment, ...commentUpdateDto });
  }

  deleteComment({ commentId, cardId }: { commentId: string; cardId: string }) {
    return this.commentsRepository.delete({ cardId, id: commentId });
  }
}
