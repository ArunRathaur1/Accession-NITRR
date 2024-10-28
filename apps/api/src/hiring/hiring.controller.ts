import {
  Body,
  Controller,
  Delete,
  HttpException,
  Param,
  Post,
} from '@nestjs/common';
import { HiringUserDto } from 'src/dtos/Hiring.dto';
import { HiringService } from './hiring.service';
import mongoose from 'mongoose';

@Controller('hiring')
export class HiringController {
  constructor(private hiringService: HiringService) {}
  @Post()
  async formCollection(@Body() hiringUserDto: HiringUserDto) {
    console.log(hiringUserDto);
    return this.hiringService.collectForm(hiringUserDto);
  }

  @Delete(':id')
  async withdraw(@Param('id') id: string) {
    const isValid = mongoose.Types.ObjectId.isValid(id);
    if (!isValid) throw new HttpException('Invalid id', 400);
    return await this.hiringService.withdraw(id);
  }
}

/*
form format:

{
  username string
  email string
  password string
  branch string
  year string
  position string
  domain string
  linkedIn string
  GitHub string
  about string
  priorAchievements string

}
*/
