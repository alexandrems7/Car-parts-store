import { Injectable } from '@nestjs/common';
import { Category } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { handleErrorUnique } from 'src/utils/handle.error.unique';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoryService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createCategoryDto: CreateCategoryDto): Promise<Category | void> {
    const newCategory = await this.prisma.category
      .create({ data: createCategoryDto })
      .catch(handleErrorUnique);

    return newCategory;
  }

  findAll() {
    return this.prisma.category.findMany();
  }

  findOne(id: string): Promise<Category> {
    return this.prisma.category.findUnique({
      where: { id },
    });
  }

  update(
    id: string,
    updateCategoryDto: UpdateCategoryDto,
  ): Promise<Category | void> {
    return this.prisma.category
      .update({
        where: { id },
        data: updateCategoryDto,
      })
      .catch(handleErrorUnique);
  }

  remove(id: string) {
    return this.prisma.category.delete({
      where: { id },
      select: { name: true },
    });
  }
}
