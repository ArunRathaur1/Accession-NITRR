import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { UserServices } from './user.service';
import { CreateUserDto } from 'src/dtos/CreateUser.dto';
import { UpdateUserDto } from 'src/dtos/UserUpdate.dto';
import { User } from 'src/schema/user.schema';
import mongoose from 'mongoose';
import { HiringService } from 'src/hiring/hiring.service';

@Controller('user')
export class UserController {
  constructor(
    private userService: UserServices,
    private hiringService: HiringService,
  ) {}

  @Post()
  async createUser(@Body() createUserDto: CreateUserDto) {
    console.log(createUserDto);
    return await this.userService.createUser(createUserDto);
  }

  @Get('get-all-users')
  async getUsers() {
    return await this.userService.getUsers();
  }

  @Patch(':id')
  async updateUser(
    @Param('id') id: string,
    @Body() userUpdate: UpdateUserDto,
  ): Promise<User> {
    const isValid = mongoose.Types.ObjectId.isValid(id);
    if (!isValid) throw new HttpException('Invalid id', 400);
    return await this.userService.customUpdateUser(id, userUpdate);
  }

  @Delete(':id')
  async deleteUserr(@Param('id') id: string) {
    const isValid = mongoose.Types.ObjectId.isValid(id);
    if (!isValid) throw new HttpException('Invalid id', 400);
    return await this.userService.deleteUser(id);
  }

  @Get('recruit')
  async applicants() {
    return this.hiringService.applicants();
  }

  @Patch('recruit/:id')
  async select(@Param('id') id: string) {
    const employee = await this.hiringService.getUserById(id);
    if (!employee) {
      throw new HttpException('No such applicant', HttpStatus.NOT_FOUND);
    }
    return await this.hiringService.selectTheApplicant(id);
  }

  @Get('recruited')
  async hiredPeoples() {
    return this.hiringService.hiredFolks();
  }
}
