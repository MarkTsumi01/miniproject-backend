import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/logIn.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('/getMessage')
  getMessage() {
    return this.authService.getMessage();
  }

  @Post('/login')
  login(@Body() loginDto: LoginDto) {
    const result = this.authService.login(loginDto.signatures);

    return result;
  }
}
