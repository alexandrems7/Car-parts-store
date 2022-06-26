import { IsEmail, IsNumber, IsString } from 'class-validator';

export class CreatUserDto {
  @IsString()
  name: string;
  @IsEmail()
  email: string;
  @IsNumber()
  password: number;
}
