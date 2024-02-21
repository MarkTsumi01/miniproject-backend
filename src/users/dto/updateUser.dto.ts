import { IsString } from 'class-validator';

export class updateUser {
  @IsString({ message: 'Please insert string' })
  fullname: string;

  @IsString({ message: 'Please insert string' })
  username: string;

  @IsString({ message: 'Please insert string' })
  role: string;

  @IsString({ message: 'Please insert string' })
  accessToken: string;

  // @IsString({ message: 'Please insert string' })
  // img_url: string;
}
