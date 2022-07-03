import { Injectable } from '@nestjs/common';
import { CreatUserDto } from './dto/create-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { User } from '@prisma/client';
import * as bcrypt from 'bcryptjs';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  getAll(): Promise<User[]> {
    return this.prisma.user.findMany();
  }

  getById(id: string): Promise<User> {
    return this.prisma.user.findUnique({ where: { id } });
  }

  create(createUserDto: CreatUserDto): Promise<User> {
    const hashedPassword = bcrypt.hashSync(createUserDto.password, 8);

    const data: CreatUserDto = {
      name: createUserDto.name,
      email: createUserDto.email,
      password: hashedPassword,
    };

    return this.prisma.user.create({ data });
  }

  delete(id: string) {
    return this.prisma.user.delete({
      where: { id },
      select: { name: true, email: true },
    });
  }

  update(id: string, updateUserdto: UpdateUserDto) {
    return this.prisma.user.update({ where: { id }, data: updateUserdto });
  }
}
