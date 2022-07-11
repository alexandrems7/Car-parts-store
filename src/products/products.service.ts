import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { User } from 'src/users/entities/users.entities';
import { handleErrorUnique } from 'src/utils/handle.error.unique';
import { CreateProductDto } from './dto/create-product.dto';
import { FavoriteproductDto } from '../favorites/dto/favorite.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';
import { Favorite } from 'src/favorites/entities/favorite-entity';

@Injectable()
export class ProductsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createProductDto: CreateProductDto): Promise<Product | void> {
    const newProduct = await this.prisma.product
      .create({ data: createProductDto })
      .catch(handleErrorUnique);

    return newProduct;
  }

  findAll(): Promise<Product[]> {
    return this.prisma.product.findMany();
  }

  async verifyIdandReturnProduct(id: string): Promise<Product> {
    const product: Product = await this.prisma.product.findUnique({
      where: { id },
    });

    if (!product) {
      throw new NotFoundException(`id ${id} not found`);
    }

    return product;
  }

  findOne(id: string) {
    return this.verifyIdandReturnProduct(id);
  }

  async update(
    id: string,
    updateProductDto: UpdateProductDto,
  ): Promise<Product | void> {
    await this.verifyIdandReturnProduct(id);

    return this.prisma.product
      .update({
        where: { id },
        data: updateProductDto,
      })
      .catch(handleErrorUnique);
  }

  async remove(id: string) {
    await this.verifyIdandReturnProduct(id);

    return this.prisma.product.delete({
      where: { id },
      select: { name: true, description: true },
    });
  }

  async favorite(favoriteproductDto: FavoriteproductDto): Promise<Favorite> {
    const user: User = await this.prisma.user.findUnique({
      where: { id: favoriteproductDto.userId },
    });

    if (!user) {
      throw new NotFoundException(
        `user ${favoriteproductDto.userId} not found`,
      );
    }

    const productName: Product = await this.prisma.product.findUnique({
      where: { name: favoriteproductDto.productName },
    });

    if (!productName) {
      throw new NotFoundException(
        `product ${favoriteproductDto.productName} not found`,
      );
    }

    return this.prisma.favorite.create({ data: favoriteproductDto });
  }

  disfavor(id: string) {
    return this.prisma.favorite.delete({ where: { id } });
  }
}
