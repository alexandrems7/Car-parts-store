import {
  Injectable,
  NotFoundException,
  Param,
  UnprocessableEntityException,
} from '@nestjs/common';
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
    const newOrder = await this.prisma.order
      .create({ data })
      .catch(this.handleErrorUnique);

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

  handleErrorUnique(error: Error): never {
    const splitedMessage = error.message.split('`');

    const errorMessage = `input ${
      splitedMessage[splitedMessage.length - 2]
    } is not a single constraint UNIQUE`;

    throw new UnprocessableEntityException(errorMessage);
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
      .catch(this.handleErrorUnique);
  }

  async remove(id: number) {
    await this.veriflyIdAndReturnOrder(id);

    return this.prisma.order.delete({
      where: { id },
      select: { number: true },
    });
  }
}
