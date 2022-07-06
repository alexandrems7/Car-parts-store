import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { Product } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createProductDto: CreateProductDto): Promise<Product | void> {
    const data: CreateProductDto = {
      title: createProductDto.title,
      description: createProductDto.description,
      price: createProductDto.price,
      image: createProductDto.image,
    };

    const newProduct = await this.prisma.product
      .create({ data })
      .catch(this.handleErrorUnique);

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

  handleErrorUnique(error: Error): never {
    const splitedMessage = error.message.split('`');

    const errorMenssage = `input ${
      splitedMessage[splitedMessage.length - 2]
    } is not a single constraint UNIQUE`;

    throw new UnprocessableEntityException(errorMenssage);
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
      .catch(this.handleErrorUnique);
  }

  async remove(id: string) {
    await this.verifyIdandReturnProduct(id);

    return this.prisma.product.delete({
      where: { id },
      select: { title: true, description: true },
    });
  }
}
