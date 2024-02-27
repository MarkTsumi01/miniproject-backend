import { IsNumber, IsString } from 'class-validator';

export class createComment {
  @IsString({ message: 'Comment should be string' })
  commentText: string;

  @IsNumber()
  postId: number;
}
