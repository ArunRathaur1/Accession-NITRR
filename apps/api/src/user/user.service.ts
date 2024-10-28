import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from 'src/dtos/CreateUser.dto';
// import { HiringUserDto } from 'src/dtos/Hiring.dto';
import { UpdateUserDto } from 'src/dtos/UserUpdate.dto';
import { HiringService } from 'src/hiring/hiring.service';
import { User } from 'src/schema/user.schema';

@Injectable()
export class UserServices {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private readonly hiringService: HiringService,
  ) {}

  //CRUD
  async createUser(createUserDto: CreateUserDto) {
    try {
      const newUser = new this.userModel(createUserDto);
      return (await newUser.save()).id;
    } catch (error) {
      if (error.code === 11000) {
        //Duplicacy
        const field = Object.keys(error.keyValue)[0];
        throw new HttpException(
          `${field.charAt(0).toUpperCase() + field.slice(1)} already exists.`,
          HttpStatus.BAD_REQUEST,
        );
      } else {
        throw new HttpException(
          'Invalid Credentials',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
  }
  getUsers() {
    return this.userModel.find();
  }
  //update
  customUpdateUser(id: string, userUpdateDto: UpdateUserDto) {
    return this.userModel.findByIdAndUpdate(id, userUpdateDto, { new: true });
  }

  async deleteUser(id: string) {
    const deletedUser = await this.userModel.findByIdAndDelete(id);
    if (!deletedUser) {
      throw new HttpException('User Not Found!', HttpStatus.NOT_FOUND);
    }
    return {
      message: 'User successfully deleted',
      userId: id,
      userName: deletedUser.username,
    };
  }

  // async recruit(id: string) {

  // }
}

/*
to tokenize:
{
userid,
position
}
*/
