import { PickType } from '@nestjs/swagger';
import { Comment } from '../entities/comment.entity';

export class CommentCreateDto extends PickType(Comment, ['comment']) {}

export class CommentUpdateDto extends PickType(Comment, ['comment']) {}
