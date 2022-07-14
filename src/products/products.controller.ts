import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Product } from './entities/product.entity';
import { FavoriteproductDto } from '../favorites/dto/favorite.dto';
import { Favorite } from 'src/favorites/entities/favorite-entity';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('products')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  @ApiOperation({ summary: 'register new proudct' })
  create(@Body() createProductDto: CreateProductDto): Promise<Product | void> {
    return this.productsService.create(createProductDto);
  }

  @Get()
  @ApiOperation({ summary: 'list all products present in the database' })
  findAll(): Promise<Product[]> {
    return this.productsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'search pruduct by id' })
  findOne(@Param('id') id: string): Promise<Product> {
    return this.productsService.findOne(id);
  }

  @Get('favorite/:id')
  @ApiOperation({ summary: 'list of users who have favorited a product' })
  listUserslikedProduct(@Param('id') id: string) {
    return this.productsService.listUserslikedProduct(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'update an product' })
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

  @Post('favorite')
  @UseGuards(AuthGuard())
  @ApiOperation({ summary: 'user favorite products' })
  @ApiBearerAuth()
  favorite(@Body() favoriteproductDto: FavoriteproductDto): Promise<Favorite> {
    return this.productsService.favorite(favoriteproductDto);
  }

  @Delete('disfavor/:id')
  @ApiOperation({ summary: 'disfavor' })
  disfavor(@Param('id') id: string) {
    return this.productsService.disfavor(id);
  }
}
