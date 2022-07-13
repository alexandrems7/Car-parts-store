import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { domainToASCII } from 'url';
import { CreateOrderDto } from './dto/create-order.dto';

@Injectable()
export class OrdersService {
  constructor(private readonly prisma: PrismaService) {}

  create(createOrderDto: CreateOrderDto) {
    const data: Prisma.OrderCreateInput = {
      table: {
        connect: {
          number: createOrderDto.tableNumber,
        },
      },
      user: {
        connect: {
          id: createOrderDto.userId,
        },
      },
      products: {
        connect: createOrderDto.products.map((element) => ({ id: element })),
      },
    };

    return this.prisma.order.create({
      data,
      select: {
        id: true,
        tableNumber: true,
        userId: true,
        createdAt: true,
        products: { select: { name: true } },
      },
    });
  }

  findAll() {
    return `This action returns all orders`;
  }

  findOne(id: number) {
    return `This action returns a #${id} order`;
  }
}
