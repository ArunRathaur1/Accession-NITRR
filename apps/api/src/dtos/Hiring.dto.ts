import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
  MinLength,
} from 'class-validator';

export class HiringUserDto {
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

  @IsUrl({}, { message: 'Invalid LinkedIn URL' })
  @IsNotEmpty()
  linkedIn: string;

  @IsOptional()
  @IsUrl({}, { message: 'Invalid GitHub URL' })
  GitHub?: string;

  @IsString()
  @IsNotEmpty()
  about: string;

  @IsString()
  @IsOptional()
  priorAchievements?: string[];
}
