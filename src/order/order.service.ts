import { Injectable, Param } from '@nestjs/common';
import { Order } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';

@Injectable()
export class OrderService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createOrderDto: CreateOrderDto): Promise<Order | void> {
    const data: CreateOrderDto = {
      number: createOrderDto.number,
    };
    const newOrder = await this.prisma.order.create({ data });

    return newOrder;
  }

  findAll(): Promise<Order[]> {
    return this.prisma.order.findMany();
  }

  findOne(@Param('id') id: number): Promise<Order> {
    return this.prisma.order.findUnique({ where: { id } });
  }

  update(id: number, updateOrderDto: UpdateOrderDto) {
    return `This action updates a #${id} order`;
  }

  remove(id: number) {
    return `This action removes a #${id} order`;
  }
}
