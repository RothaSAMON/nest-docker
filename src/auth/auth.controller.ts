import { Body, Controller, Get, HttpStatus, Post, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  signUp(@Body() signUpDto: SignUpDto): Promise<{ token: string }> {
    return this.authService.signUp(signUpDto);
  }

  @Get('login')
  async login(@Body() loginDto: LoginDto, @Res() res: Response) {
    const result = await this.authService.login(loginDto, res);

    return res.status(HttpStatus.ACCEPTED).json(result);
  }

  @Get('logout')
  async logout(@Res() res: Response) {
    const result = await this.authService.logout(res);

    return res.status(HttpStatus.ACCEPTED).json(result);
  }
}
