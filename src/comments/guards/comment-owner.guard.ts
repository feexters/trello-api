import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CommentsRepository } from '../repositories/comments.repository';

@Injectable()
export class CommentOwnerGuard implements CanActivate {
  constructor(
    @InjectRepository(CommentsRepository)
    private readonly commentsRepository: CommentsRepository,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    const isOwner = await this.commentsRepository.isCommentOwner(
      request.params.commentId,
      request.user.id,
    );

    if (!isOwner) {
      throw new ForbiddenException();
    }

    return isOwner;
  }
}
