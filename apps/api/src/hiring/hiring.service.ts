import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { HiringUserDto } from 'src/dtos/Hiring.dto';
import { Hiring } from 'src/schema/hiring.schema';

@Injectable()
export class HiringService {
  constructor(@InjectModel(Hiring.name) private hiringModel: Model<Hiring>) {}

  async collectForm(hiringUserDto: HiringUserDto) {
    try {
      const newUser = new this.hiringModel(hiringUserDto);
      return { message: 'Form Collected', userId: (await newUser.save()).id };
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
          'Invalid Credentials, Make sure the format of entered fields is valid!',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
  }

  async applicants() {
    return this.hiringModel.find();
  }

  async withdraw(id: string) {
    const deletedUser = await this.hiringModel.findByIdAndDelete(id);
    if (!deletedUser) {
      throw new HttpException('User Not Found!', HttpStatus.NOT_FOUND);
    }
    return {
      message: 'Form withdrawn',
      userId: id,
      userName: deletedUser.username,
    };
  }

  async hiredFolks() {
    return await this.hiringModel.find({ isHired: true });
  }

  async getUserById(id: string) {
    return await this.hiringModel.findById(id);
  }

  //selection of the candidate
  async selectTheApplicant(id: string) {
    return await this.hiringModel.findByIdAndUpdate(
      id,
      { isHired: true },
      { new: true },
    );
  }
}
