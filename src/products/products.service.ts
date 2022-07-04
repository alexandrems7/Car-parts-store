import { Injectable } from '@nestjs/common';
import { Product } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductsService {
  constructor(private readonly prisma: PrismaService) {}

  getAll(): Promise<Product[]> {
    return this.prisma.product.findMany();
  }

  getById(id: string): Promise<Product> {
    return this.prisma.product.findUnique({ where: { id } });
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

  delete(id: string) {
    return this.prisma.product.delete({
      where: { id },
      select: { title: true, description: true },
    });
  }

  update(
    id: string,
    updateProductDto: UpdateProductDto,
  ): Promise<Product | void> {
    return this.prisma.product.update({
      where: { id },
      data: updateProductDto,
    });
  }
}
