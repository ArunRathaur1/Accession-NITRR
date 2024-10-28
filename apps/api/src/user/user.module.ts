import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/schema/user.schema';
import { UserServices } from './user.service';
import { UserController } from './user.controller';
import { HiringModule } from 'src/hiring/hiring.module';
@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserSchema,
      },
    ]),
    HiringModule,
  ],
  providers: [UserServices],
  controllers: [UserController],
  exports: [UserServices],
})
export class UserModule {}
