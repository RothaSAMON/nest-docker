import { Body, Controller, Get, HttpStatus, Post, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
// import { SignUpDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
import { Response } from 'express';
import { CreateUserDto } from './dto/create-user.dto';
import { Public } from './decorators/public.decorator';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  // @Post('signup')
  // signUp(@Body() signUpDto: SignUpDto): Promise<{ token: string }> {
  //   return this.authService.signUp(signUpDto);
  // }
  // ============================
  // @Post('signup')
  // signUp(
  //   @Body() body: { email: string; password: string; confirmPassword: string },
  // ): Promise<{ token: string }> {
  //   return this.authService.signUp(body);
  // }
  // This route is public
  @Public()
  @Post('signup')
  async signUp(@Body() createUserDto: CreateUserDto, @Res() res: Response) {
    const result = await this.authService.signUp(createUserDto);

    return res
      .cookie('token', result.data.token)
      .status(HttpStatus.CREATED)
      .json(result);
  }

  // This route is public
  @Public()
  @Post('login')
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
