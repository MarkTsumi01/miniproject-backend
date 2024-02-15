import { Module } from '@nestjs/common';
import { CommentsController } from './comments.controller';
import { CommentsService } from './comments.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Comment } from './entity/comments.entity';
import { Users } from 'src/users/entity/users.entity';
import { Post } from 'src/posts/entity/posts.entity';
@Module({
  imports: [TypeOrmModule.forFeature([Comment, Users, Post])],
  controllers: [CommentsController],
  providers: [CommentsService],
})
export class CommentsModule {}
