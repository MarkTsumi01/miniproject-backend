import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from './entity/users.entity';
import { Repository } from 'typeorm';
import { createUsers } from './dto/createUser.dto';
import { updateUser } from './dto/updateUser.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private readonly userRepository: Repository<Users>,
  ) {}

  async createUser(user: createUsers) {
    return await this.userRepository.save(user);
  }

  async updateUser(update: updateUser, walletAddress: string) {
    return await this.userRepository.update({ walletAddress }, update);
  }

  async findbyID(walletAddress: string): Promise<Users> {
    return await this.userRepository.findOne({
      where: {
        walletAddress: walletAddress,
      },
      relations: {
        posts: true,
      },
    });
  }

  async findbyAddress(walletAddress: string): Promise<Users> {
    return await this.userRepository.findOne({
      where: {
        walletAddress: walletAddress,
      },
    });
  }

  async saveImagePath(walletAddress: string, imagePath: string): Promise<void> {
    const user = await this.userRepository.findOne({
      where: { walletAddress: walletAddress },
    });

    if (user) {
      user.imagePath = imagePath;
      await this.userRepository.update({ walletAddress }, user);
    }
  }
}
