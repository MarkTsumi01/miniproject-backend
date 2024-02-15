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

  async createPosts(post: createPost): Promise<Post> {
    const user = await this.userRepository.findOne({
      where: {
        id: post.userId,
      },
    });

    if (!user) {
      throw new Error('User not found');
    }

    const newPost = new Post();
    newPost.title = post.title;
    newPost.body = post.body;
    newPost.img_url = post.img_url;
    newPost.user = user;

    return await this.postRepository.save(newPost);
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
