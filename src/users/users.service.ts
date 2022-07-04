import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatUserDto } from './dto/create-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { User } from '@prisma/client';
import * as bcrypt from 'bcryptjs';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  findAll(): Promise<User[]> {
    return this.prisma.user.findMany();
  }

  async verifyIdandReturnUser(id: string): Promise<User> {
    const user: User = await this.prisma.user.findUnique({ where: { id } });

    if (!user) {
      throw new NotFoundException(`id ${id} not found`);
    }

    return user;
  }

  findOne(id: string) {
    return this.verifyIdandReturnUser(id);
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

  async remove(id: string) {
    await this.verifyIdandReturnUser(id);

    return this.prisma.user.delete({
      where: { id },
      select: { name: true, email: true },
    });
  }

  async update(id: string, updateUserdto: UpdateUserDto): Promise<User | void> {
    await this.verifyIdandReturnUser(id);

    return this.prisma.user.update({ where: { id }, data: updateUserdto });
  }
}
