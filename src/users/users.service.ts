import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from './entity/users.entity';
import { Equal, Repository } from 'typeorm';
import { createUsers } from './dto/createUser.dto';
import { updateUser } from './dto/updateUser.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private readonly userRepository: Repository<Users>,
  ) {}

  async createUser(
    user: createUsers,
  ): Promise<{ user: Users; message: string }> {
    const existingUser = await this.userRepository.findOne({
      where: { wallet_address: Equal(user.wallet_address) },
    });

    if (existingUser) {
      return { user: existingUser, message: 'the user already in database' };
    } else {
      const newUser = await this.userRepository.save(user);
      return { user: newUser, message: 'create new user' };
    }
  }

  async updateUser(update: updateUser) {
    const { wallet_address, ...updatedata } = update;
    return await this.userRepository.update({ wallet_address }, updatedata);
  }

  async findbyID(id: number): Promise<Users> {
    return await this.userRepository.findOne({
      where: {
        id: id,
      },
    });
  }
}
