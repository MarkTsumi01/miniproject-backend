import { IsNumber, IsString } from 'class-validator';

export class createPost {
  @IsString({ message: 'Title should be string' })
  title: string;

  @IsString({ message: 'Body should be string' })
  body: string;

  @IsString({ message: 'Image should be string' })
  img_url: string;

  @IsNumber()
  userId: number;
}
