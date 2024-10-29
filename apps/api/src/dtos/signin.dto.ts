import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class signInDto {
  @IsNotEmpty()
  @IsString()
  username: string;
  @IsString()
  @MinLength(6, {
    message: 'The password should be atleast 6 characters long!',
  })
  @IsNotEmpty()
  password: string;
}
