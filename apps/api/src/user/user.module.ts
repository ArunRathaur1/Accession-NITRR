import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/schema/user.schema';
import { UserServices } from './user.service';
import { UserController } from './user.controller';
import { HiringModule } from 'src/hiring/hiring.module';
import { AuthGuard } from 'src/auth/guards/auth/auth.guard';
import { AuthModule } from 'src/auth/auth.module';
@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserSchema,
      },
    ]),
    HiringModule,
    forwardRef(() => AuthModule),
  ],
  providers: [UserServices, AuthGuard],
  controllers: [UserController],
  exports: [UserServices],
})
export class UserModule {}
