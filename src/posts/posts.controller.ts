import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { PostsService } from './posts.service';
import { createPost } from './dto/createPost.dto';
@Controller('posts')
export class PostsController {
  constructor(private readonly postService: PostsService) {}

  @Post('/createpost')
  async createPost(@Body() createPost: createPost) {
    return this.postService.createPosts(createPost);
  }

  @Get('/allposts')
  async getAllpost() {
    return this.postService.allPosts();
  }

  @Get(':id')
  async getPostByID(@Param('id') id: number) {
    return this.postService.findbyID(id);
  }
}
