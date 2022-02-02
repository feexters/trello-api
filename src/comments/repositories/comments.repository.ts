import { EntityRepository, Repository } from 'typeorm';
import { Comment } from '../entities/comment.entity';

@EntityRepository(Comment)
export class CommentsRepository extends Repository<Comment> {
  async isCommentOwner(commentId: string, userId: string) {
    const comment = await this.findOne({ id: commentId, userId });

    if (!comment) {
      return false;
    }

    return true;
  }
}
