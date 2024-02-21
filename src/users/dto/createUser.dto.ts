import { IsString } from 'class-validator';

export class createUsers {
  @IsString({ message: 'Please insert string' })
  walletAddress: string;
}
