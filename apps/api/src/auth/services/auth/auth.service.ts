/* eslint-disable prettier/prettier */
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserServices } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/dtos/CreateUser.dto';
import { signInDto } from 'src/dtos/signin.dto';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';
@Injectable()
export class AuthService {
  constructor(
    private userService: UserServices,
    private jwtService: JwtService,
    private configService: ConfigService
  ) {}
  private model = this.userService.getUserModel();
  public getJwtService(){
    return this.jwtService;
  }
  //signin
  async signIn(signInDto: signInDto): Promise<{ access_token: string, message: string }> {
    const userName = signInDto.username;
    const pswd = signInDto.password;
    const user = await this.model.findOne({ username: userName });
    if (!user || ! (await bcrypt.compare(pswd,user.password))) {
      throw new UnauthorizedException("Invalid username or password");
    }
    const payload = { username: userName, position: user.position, id: user._id };
    const signed = await this.jwtService.signAsync(payload);
    return {
      access_token: 'Bearer ' + signed,
      message: "Sign-in Successful!",
    };
  }
  
  //sign-up
  async signUp(
    createUserDto: CreateUserDto,
  ): Promise<{ access_token: string, message: string }> {
    const rounds = parseInt(this.configService.get<string>('SALT_ROUNDS'),10);
    createUserDto.password = await bcrypt.hash(createUserDto.password,rounds);
    const user = await this.userService.createUser(createUserDto);
    const payload = { username: createUserDto.username, position: createUserDto.position, id: user };
    const signed = await this.jwtService.signAsync(payload);
    return {
      access_token: 'Bearer '+signed,
      message: "Sign-in Successful!"
    };
  }
}
