import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { createPost } from './dto/createPost.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { diskStorage } from 'multer';
import { FileInterceptor } from '@nestjs/platform-express';

const storage = diskStorage({
  destination: './images/',
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const fileExtension = file.originalname.split('.').pop();
    cb(null, file.fieldname + '-' + uniqueSuffix + '.' + fileExtension);
  },
});

@Controller('posts')
export class PostsController {
  constructor(private readonly postService: PostsService) {}

  @UseGuards(AuthGuard)
  @Post('/createpost')
  @UseInterceptors(FileInterceptor('image', { storage }))
  async createPosts(
    @Body() createPost: createPost,
    @Req() req: Request,
    @UploadedFile() file,
  ) {
    try {
      const user = req['user'];
      const userId = user._id;

      const imagePath = process.env.DOMAIN_PATH + file.filename;
      const { id: postId } = await this.postService.createPosts(
        userId,
        createPost,
      );
      await this.postService.saveImagePath(postId, imagePath);

      return { postId, imagePath };
    } catch (error) {
      console.error(error);
      return { error: 'Error creating post' };
    }
  }

  @UseGuards(AuthGuard)
  @Get('/allposts')
  async getAllpost() {
    const post = await this.postService.allPosts();
    return post;
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  async getPostByID(@Param('id') id: number) {
    return this.postService.findbyID(id);
  }
}
