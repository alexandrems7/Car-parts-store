import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Order } from './entities/order.entity';

@ApiTags('products')
@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @ApiOperation({ summary: 'register new order' })
  @Post()
  create(@Body() createOrderDto: CreateOrderDto): Promise<Order | void> {
    return this.orderService.create(createOrderDto);
  }

  @ApiOperation({ summary: 'list all orders present in the database' })
  @Get()
  findAll(): Promise<Order[]> {
    return this.orderService.findAll();
  }

  @ApiOperation({ summary: 'search an order for id' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.orderService.findOne(+id);
  }

  @ApiOperation({ summary: 'update an order' })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto) {
    return this.orderService.update(+id, updateOrderDto);
  }

  @ApiOperation({ summary: 'delete a product' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.orderService.remove(+id);
  }
}
