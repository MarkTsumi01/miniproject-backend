import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from './entity/users.entity';
import { Repository } from 'typeorm';
import { createUsers } from './dto/createUser.dto';
import { updateUser } from './dto/updateUser.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private readonly userRepository: Repository<Users>,
    private readonly jwtService: JwtService,
  ) {}

  async createUser(user: createUsers) {
    return await this.userRepository.save(user);
  }

  async updateUser(update: updateUser) {
    const { accessToken, ...updatedata } = update;
    const jwt = this.jwtService.decode(accessToken);
    const { walletAddress } = jwt;
    return await this.userRepository.update({ walletAddress }, updatedata);
  }

  async findbyID(id: number): Promise<Users> {
    return await this.userRepository.findOne({
      where: {
        id: id,
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
}
