import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { CreatUserDto } from './dto/create-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { User } from '@prisma/client';
import * as bcrypt from 'bcryptjs';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createUserDto: CreatUserDto): Promise<User | void> {
    const hashedPassword = await bcrypt.hash(createUserDto.password, 8);

    const data: CreatUserDto = {
      name: createUserDto.name,
      email: createUserDto.email,
      password: hashedPassword,
    };

    const newUser = await this.prisma.user
      .create({ data })
      .catch(this.handleErrorUniquer);

    return newUser;
  }

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

  handleErrorUniquer(error: Error): never {
    const splitedMessage = error.message.split('`');

    const errorMenssage = `input ${
      splitedMessage[splitedMessage.length - 2]
    } is not a single constraint UNIQUE`;

    throw new UnprocessableEntityException(errorMenssage);
  }

  findOne(id: string) {
    return this.verifyIdandReturnUser(id);
  }

  async update(id: string, updateUserdto: UpdateUserDto): Promise<User | void> {
    await this.verifyIdandReturnUser(id);

    return this.prisma.user
      .update({ where: { id }, data: updateUserdto })
      .catch(this.handleErrorUniquer);
  }

  async remove(id: string) {
    await this.verifyIdandReturnUser(id);

    return this.prisma.user.delete({
      where: { id },
      select: { name: true, email: true },
    });
  }
}
