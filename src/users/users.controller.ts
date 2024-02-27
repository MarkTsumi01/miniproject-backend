import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Put,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { createUsers } from './dto/createUser.dto';
import { updateUser } from './dto/updateUser.dto';

import { AuthGuard } from 'src/auth/auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { Request } from 'express';

const storage = diskStorage({
  destination: './images/',
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const fileExtension = file.originalname.split('.').pop();
    cb(null, file.fieldname + '-' + uniqueSuffix + '.' + fileExtension);
  },
});

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Post('/createuser')
  @HttpCode(HttpStatus.CREATED)
  async createUser(@Body() createUser: createUsers) {
    const result = await this.userService.createUser(createUser);
    return result;
  }

  @UseGuards(AuthGuard)
  @Put('/updateuser')
  async updateUser(@Body() updatedata: updateUser, @Req() req: Request) {
    const user = req['user'];
    const walletAddress = user.walletAddress;
    this.userService.updateUser(updatedata, walletAddress);
  }

  @UseGuards(AuthGuard)
  @Get()
  async getPostByID(@Req() req: Request) {
    const user = req['user'];
    const walletAddress = user.walletAddress;
    return this.userService.findbyID(walletAddress);
  }

  @UseGuards(AuthGuard)
  @Post('upload')
  @UseInterceptors(FileInterceptor('image', { storage }))
  async uploadFile(@UploadedFile() file, @Req() req: Request) {
    const imagePath = process.env.DOMAIN_PATH + file.filename;

    const users = req['user'];
    const walletAddress = users.walletAddress;
    const user = await this.userService.findbyAddress(walletAddress);

    if (!user) {
      return { error: 'User not found for the given address' };
    }

    const userAddress = user.walletAddress;
    await this.userService.saveImagePath(userAddress, imagePath);
    return { imagePath };
  }
}
