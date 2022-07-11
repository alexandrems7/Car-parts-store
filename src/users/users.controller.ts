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
import { Favorite } from 'src/favorites/entities/favorite-entity';
import { CreatUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/users.entities';
import { UsersService } from './users.service';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiOperation({ summary: 'register new users' })
  create(@Body() createUserDto: CreatUserDto): Promise<User | void> {
    return this.usersService.create(createUserDto);
  }

  @Get()
  @ApiOperation({ summary: 'list all users present in the database' })
  findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'search user by id' })
  findOne(@Param('id') id: string): Promise<User> {
    return this.usersService.findOne(id);
  }

  @Get('favorite/:id')
  @ApiOperation({ summary: 'list all favorites the user' })
  listFavoritesProducts(id: string): Promise<Favorite[]> {
    return this.usersService.listFavoritesProducts(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'update user' })
  update(
    @Param('id') id: string,
    @Body() updateUserdto: UpdateUserDto,
  ): Promise<User | void> {
    return this.usersService.update(id, updateUserdto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'delete user' })
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}
