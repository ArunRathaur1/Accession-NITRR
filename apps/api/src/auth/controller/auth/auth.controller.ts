/* eslint-disable prettier/prettier */
import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from 'src/auth/services/auth/auth.service';
import { CreateUserDto } from 'src/dtos/CreateUser.dto';
import { signInDto } from 'src/dtos/signin.dto';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService){}
  @Post('sign-in')
  signIn(@Body() signInDto:signInDto) {
    return this.authService.signIn(signInDto);
  }

  @Post('sign-up')
  signUp(@Body() signUpDto: CreateUserDto){
    return this.authService.signUp(signUpDto);
  }
}
