import { Module } from '@nestjs/common';
import { AuthService } from './services/auth/auth.service';
import { AuthController } from './controller/auth/auth.controller';
import { UserServices } from 'src/user/user.service';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [UserModule],
  providers: [
    {
      provide: 'AUTH_SERVICE',
      useClass: AuthService,
    },
    {
      provide: 'USER_SERVICE',
      useClass: UserServices,
    },
  ],
  controllers: [AuthController],
})
export class AuthModule {}
