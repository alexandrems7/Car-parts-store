import { Injectable } from '@nestjs/common';
import { CreatUserDto } from './dto/create-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { User } from '@prisma/client';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  getAll(): Promise<User[]> {
    return this.prisma.user.findMany();
  }

  create(createUserDto: CreatUserDto) {
    return this.prisma.user.create({ data: createUserDto });
  }
}
