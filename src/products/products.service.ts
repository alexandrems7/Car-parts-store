import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { handleErrorUnique } from 'src/utils/handle.error.unique';
import { CreateProductDto } from './dto/create-product.dto';
import { FavoriteproductDto } from './dto/favorite-product';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';

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

  favorite(favoriteproductDto: FavoriteproductDto) {
    return this.prisma.favorite.create({ data: favoriteproductDto });
  }
}
