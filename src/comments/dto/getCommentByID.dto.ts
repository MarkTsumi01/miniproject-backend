import { IsNumber } from 'class-validator';

export class getCommentByID {
  @IsNumber()
  postId: number;
}
