import { Module } from '@nestjs/common';
import { CommentsService } from './services/comments.service';
import { CommentsController } from './comments.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentsRepository } from './repositories/comments.repository';

@Module({
  imports: [TypeOrmModule.forFeature([CommentsRepository])],
  providers: [CommentsService],
  controllers: [CommentsController],
})
export class CommentsModule {}
