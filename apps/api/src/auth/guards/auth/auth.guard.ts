/* eslint-disable prettier/prettier */
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';


@Injectable()
export class AuthGuard implements CanActivate{
  constructor(private jwtService: JwtService, private configService: ConfigService){}
  private extractTokenFromHeader(request: Request): string | undefined {
      try{const [type, token] = request.headers.authorization?.split(' ') ?? [];
      return type === 'Bearer' ? token : undefined;}
      catch(error){
        throw new UnauthorizedException("Authorization absent from request header");
      }
    }

  async canActivate(context: ExecutionContext): Promise<boolean>{
      const req = context.switchToHttp().getRequest();
      const token = this.extractTokenFromHeader(req);
      if (!token) {
          throw new UnauthorizedException("Unauthorized Access Attempt");
      }
      try{
          const secret = this.configService.get<string>('JWT_SECRET');
          const payload = await this.jwtService.verifyAsync(token,{secret})
          req['user'] = payload;
      } catch{
          throw new UnauthorizedException();
      }
      return true;
      
  }
  
}