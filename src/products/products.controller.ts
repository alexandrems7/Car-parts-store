import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Product } from './entities/product.entity';

@ApiTags('products')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  @ApiOperation({ summary: 'register new proudct' })
  create(@Body() createProductDto: CreateProductDto): Promise<Product> {
    return this.productsService.create(createProductDto);
  }

  @Get()
  @ApiOperation({ summary: 'list all products present in the database' })
  getAll(): Promise<Product[]> {
    return this.productsService.getAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'search pruduct by id' })
  getById(@Param('id') id: string): Promise<Product> {
    return this.productsService.getById(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'update a product' })
  update(
    @Param('id') id: string,
    @Body() updateProductDto: UpdateProductDto,
  ): Promise<Product | void> {
    return this.productsService.update(id, updateProductDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'delete a product' })
  remove(@Param('id') id: string) {
    return this.productsService.remove(id);
  }
}
