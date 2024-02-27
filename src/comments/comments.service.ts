import { Injectable } from '@nestjs/common';
import { Comment } from './entity/comments.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { createComment } from './dto/createComment.dto';
import { Users } from 'src/users/entity/users.entity';
import { Post } from 'src/posts/entity/posts.entity';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>,
    @InjectRepository(Users)
    private userRepository: Repository<Users>,
    @InjectRepository(Post)
    private postRepository: Repository<Post>,
  ) {}

  async createComment(
    comments: createComment,
    userId: number,
  ): Promise<Comment> {
    const user = await this.userRepository.findOne({
      where: {
        id: userId,
      },
    });

    const post = await this.postRepository.findOne({
      where: {
        id: comments.postId,
      },
    });

    if (!user || !post) {
      throw new Error('User not found or Post not found');
    }

    const newComment = new Comment();
    newComment.commentText = comments.commentText;
    newComment.post = post;
    newComment.user = user;

    return await this.commentRepository.save(newComment);
  }

  async findbyPostId(postId: number): Promise<Comment> {
    return await this.commentRepository.findOne({
      where: {
        post: { id: postId },
      },
      relations: {
        user: true,
      },
    });
  }
}
