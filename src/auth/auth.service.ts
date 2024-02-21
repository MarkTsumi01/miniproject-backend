import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ethers } from 'ethers';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  getMessage(): { message: string } {
    return { message: process.env.SIGN_MESSAGE };
  }

  async login(signature: string) {
    const { message } = this.getMessage();
    try {
      const decodedAddress = ethers
        .verifyMessage(message, signature)
        .toLowerCase();
      let user = await this.userService.findbyAddress(decodedAddress);
      if (!user) {
        user = await this.userService.createUser({
          walletAddress: decodedAddress,
        });
      }
      const payload = { walletAddress: decodedAddress, _id: user.id };
      const token = await this.generateToken(payload);

      return { data: token };
    } catch (error) {
      console.log(error);
      throw new UnauthorizedException();
    }
  }

  private async generateToken(payload: any) {
    const accessToken = await this.jwtService.signAsync(payload, {
      secret: process.env.JWT_SECRET,
      expiresIn: process.env.SECRET_EXPIRES_IN,
    });

    // const refreshToken = await this.jwtService.sign(payload, {
    //   secret: process.env.JWT_REFRESH,
    //   expiresIn: process.env.REFRESH_EXPIRES_IN,
    // });

    return {
      accessToken,
    };
  }
}
