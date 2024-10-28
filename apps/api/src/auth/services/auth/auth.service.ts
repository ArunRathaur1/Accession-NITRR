import { Injectable } from '@nestjs/common';
import { UserServices } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserServices) {}
  async validateUser(username: string, password: string) {}
}
