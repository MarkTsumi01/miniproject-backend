import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { createComment } from './dto/createComment.dto';
import { AuthGuard } from 'src/auth/auth.guard';
@Controller('comments')
export class CommentsController {
  constructor(private readonly commentService: CommentsService) {}

  @UseGuards(AuthGuard)
  @Post('/createcomment')
  async createPost(@Body() createPost: createComment, @Req() req: Request) {
    const user = req['user'];
    const userId = user._id;

    return this.commentService.createComment(createPost, userId);
  }

  @Get('/allcomments')
  async getAllcomment(@Body() postId: number) {
    const id = postId;
    return this.commentService.findbyPostId(id);
  }
}
