import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { createUsers } from './dto/createUser.dto';
import { updateUser } from './dto/updateUser.dto';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('users')
export class UsersController {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  @Post('/createuser')
  @HttpCode(HttpStatus.CREATED)
  async createUser(@Body() createUser: createUsers) {
    const result = await this.userService.createUser(createUser);
    return result;
  }

  @UseGuards(AuthGuard)
  @Put('/updateuser')
  async updateUser(@Body() updatedata: updateUser) {
    this.userService.updateUser(updatedata);
  }

  @Get(':id')
  async getPostByID(@Param('id') id: number) {
    return this.userService.findbyID(id);
  }
}
