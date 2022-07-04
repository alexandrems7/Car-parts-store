import { Injectable, NotFoundException } from '@nestjs/common';
import { Product } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductsService {
  constructor(private readonly prisma: PrismaService) {}

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

  create(createProductDto: CreateProductDto): Promise<Product> {
    const data: CreateProductDto = {
      title: createProductDto.title,
      description: createProductDto.description,
      price: createProductDto.price,
      image: createProductDto.image,
    };

    return this.prisma.product.create({ data });
  }

  async remove(id: string) {
    await this.verifyIdandReturnProduct(id);

    return this.prisma.product.delete({
      where: { id },
      select: { title: true, description: true },
    });
  }

  async update(
    id: string,
    updateProductDto: UpdateProductDto,
  ): Promise<Product | void> {
    await this.verifyIdandReturnProduct(id);

    return this.prisma.product.update({
      where: { id },
      data: updateProductDto,
    });
  }
}
