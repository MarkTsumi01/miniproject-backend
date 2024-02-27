import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from './entity/posts.entity';
import { createPost } from './dto/createPost.dto';
import { Users } from 'src/users/entity/users.entity';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
    @InjectRepository(Users)
    private userRepository: Repository<Users>,
  ) {}

  async createPosts(userId: number, post: createPost): Promise<{ id: number }> {
    const user = await this.userRepository.findOne({
      where: {
        id: userId,
      },
    });

    if (!user) {
      throw new Error('User not found');
    }

    const newPost = new Post();
    newPost.title = post.title;
    newPost.body = post.body;
    newPost.user = user;

    const savedPost = await this.postRepository.save(newPost);
    const postId = savedPost.id;

    return { id: postId };
  }

  async saveImagePath(postId: number, imagePath: string): Promise<void> {
    const post = await this.postRepository.findOneBy({
      id: postId,
    });
    if (!post) {
      throw new Error('Post not found');
    }
    post.imagePath = imagePath;
    await this.postRepository.save(post);
  }

  async allPosts(): Promise<Post[]> {
    return await this.postRepository.find({
      relations: {
        user: true,
        comments: true,
      },
    });
  }

  async findbyID(id: number): Promise<Post> {
    return await this.postRepository.findOne({
      where: {
        id: id,
      },
      relations: {
        user: true,
        comments: true,
      },
    });
  }
}
