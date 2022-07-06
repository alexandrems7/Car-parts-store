import { Injectable, NotFoundException, Param } from '@nestjs/common';
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

  async veriflyIdAndReturnOrder(id: number): Promise<Order> {
    const order: Order = await this.prisma.order.findUnique({ where: { id } });

    if (!order) {
      throw new NotFoundException(`id ${id} not found`);
    }

    return order;
  }

  findOne(@Param('id') id: number): Promise<Order> {
    return this.veriflyIdAndReturnOrder(id);
  }

  async update(
    id: number,
    updateOrderDto: UpdateOrderDto,
  ): Promise<Order | void> {
    await this.veriflyIdAndReturnOrder(id);

    return this.prisma.order.update({ where: { id }, data: updateOrderDto });
  }

  async remove(id: number) {
    await this.veriflyIdAndReturnOrder(id);

    return this.prisma.order.delete({
      where: { id },
      select: { number: true },
    });
  }
}
