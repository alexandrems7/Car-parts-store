import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreatUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
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

  @Get(':id')
  @ApiOperation({ summary: 'search user by id' })
  getById(@Param('id') id: string): Promise<User> {
    return this.usersService.getById(id);
  }

  @Post()
  @ApiOperation({ summary: 'register new users' })
  create(@Body() createUserDto: CreatUserDto): Promise<User> {
    return this.usersService.create(createUserDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'delete user' })
  delete(@Param('id') id: string) {
    return this.usersService.delete(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'update user' })
  update(@Param('id') id: string, @Body() updateUserdto: UpdateUserDto) {
    return this.usersService.update(id, updateUserdto);
  }
}
