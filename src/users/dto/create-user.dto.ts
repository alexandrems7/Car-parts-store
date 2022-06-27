import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNumber, IsString } from 'class-validator';

export class CreatUserDto {
  @ApiProperty({
    description: 'User name',
    example: 'Andrei',
  })
  @IsString()
  name: string;

  @ApiProperty({
    description: 'User email',
    example: 'andrei@blue.com',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'User password',
    example: '1234455',
  })
  @IsNumber()
  password: number;
}
