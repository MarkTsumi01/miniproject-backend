import { Body, Controller, Post } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { createComment } from './dto/createComment.dto';
@Controller('comments')
export class CommentsController {
  constructor(private readonly commentService: CommentsService) {}

  @Post('/createcomment')
  async createPost(@Body() createPost: createComment) {
    return this.commentService.createComment(createPost);
  }
}
