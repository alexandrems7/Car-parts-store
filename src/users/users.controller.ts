import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreatUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  getAll() {
    return this.usersService.getAll();
  }

  @Post()
  create(@Body() createUserDto: CreatUserDto) {
    return this.usersService.create(createUserDto);
  }
}
