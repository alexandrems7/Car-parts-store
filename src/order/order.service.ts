import { Injectable, NotFoundException, Param } from '@nestjs/common';
import { Order } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { handleErrorUnique } from 'src/utils/handle.error.unique';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';

@Injectable()
export class OrderService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createOrderDto: CreateOrderDto): Promise<Order | void> {
    const data: CreateOrderDto = {
      number: createOrderDto.number,
    };
    const newOrder = await this.prisma.order
      .create({ data })
      .catch(handleErrorUnique);

    return newOrder;
  }

  findAll(): Promise<Order[]> {
    return this.prisma.order.findMany();
  }

  async veriflyIdAndReturnOrder(id: number) {
    const module = await this.prisma.order.findUnique({ where: { id } });

    if (!module) {
      throw new NotFoundException(`id ${id} not found`);
    }

    return module;
  }

  findOne(@Param('id') id: number): Promise<Order> {
    return this.veriflyIdAndReturnOrder(id);
  }

  async update(
    id: number,
    updateOrderDto: UpdateOrderDto,
  ): Promise<Order | void> {
    await this.veriflyIdAndReturnOrder(id);

    return this.prisma.order
      .update({ where: { id }, data: updateOrderDto })
      .catch(handleErrorUnique);
  }

  async remove(id: number) {
    await this.veriflyIdAndReturnOrder(id);

    return this.prisma.order.delete({
      where: { id },
      select: { number: true },
    });
  }
}
