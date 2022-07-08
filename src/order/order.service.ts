import { Injectable, Param } from '@nestjs/common';
import { Order } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { handleErrorUnique } from 'src/utils/handle.error.unique';
import { veriflyIdAndReturnElement } from 'src/utils/verifly.id.and.return.order';
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

  findOne(@Param('id') id: number): Promise<Order> {
    return veriflyIdAndReturnElement(
      id,
      this.prisma.order.findUnique({ where: { id } }),
    );
  }

  async update(
    id: number,
    updateOrderDto: UpdateOrderDto,
  ): Promise<Order | void> {
    await veriflyIdAndReturnElement(
      id,
      this.prisma.order.findUnique({ where: { id } }),
    );

    return this.prisma.order
      .update({ where: { id }, data: updateOrderDto })
      .catch(handleErrorUnique);
  }

  async remove(id: number) {
    await veriflyIdAndReturnElement(
      id,
      this.prisma.order.findUnique({ where: { id } }),
    );

    return this.prisma.order.delete({
      where: { id },
      select: { number: true },
    });
  }
}
