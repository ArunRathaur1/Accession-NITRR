import {
  IsBoolean,
  IsEmail,
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
  MinLength,
} from 'class-validator';
import { Types } from 'mongoose';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsEmail({}, { message: 'Invalid email address' })
  @IsNotEmpty()
  email: string;

  @IsString()
  @MinLength(6, {
    message: 'The password should be atleast 6 characters long!',
  })
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsNotEmpty()
  branch: string;

  @IsString()
  @IsNotEmpty()
  year: string;

  @IsString()
  @IsNotEmpty()
  position: string;

  @IsString()
  @IsNotEmpty()
  domain: string;

  @IsBoolean()
  @IsNotEmpty()
  isLoggedIn: boolean;

  @IsBoolean()
  @IsNotEmpty()
  isAdmin: boolean;

  @IsBoolean()
  @IsNotEmpty()
  isHead: boolean;

  @IsBoolean()
  @IsNotEmpty()
  isCore: boolean;

  @IsBoolean()
  @IsNotEmpty()
  isExe: boolean;

  @IsUrl({}, { message: 'Invalid LinkedIn URL' })
  @IsNotEmpty()
  linkedIn: string;

  @IsOptional()
  @IsUrl({}, { message: 'Invalid GitHub URL' })
  GitHub?: string;

  @IsOptional()
  @IsUrl({}, { message: 'Invalid Avatar URL' })
  avatarUrl?: string;

  @IsNotEmpty()
  @IsMongoId({ message: 'Invalid hiring ID' })
  hiringId: Types.ObjectId;
}
