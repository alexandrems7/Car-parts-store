import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreatUserDto } from './dto/create-user.dto';
import { User } from './entities/users.entities';
import { UsersService } from './users.service';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @ApiOperation({ summary: 'list all users present in the database' })
  getAll(): Promise<User[]> {
    return this.usersService.getAll();
  }

  @Post()
  @ApiOperation({ summary: 'register new users' })
  create(@Body() createUserDto: CreatUserDto): Promise<User> {
    return this.usersService.create(createUserDto);
  }
}
