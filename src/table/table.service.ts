import { Injectable, NotFoundException, Param } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { handleErrorUnique } from 'src/utils/handle.error.unique';
import { CreateTableDto } from './dto/create-table.dto';
import { UpdateTableDto } from './dto/update-table.dto';
import { Table } from './entities/table.entity';

@Injectable()
export class TableService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createtableDto: CreateTableDto): Promise<Table | void> {
    const data: CreateTableDto = {
      number: createtableDto.number,
    };
    const newTable = await this.prisma.table
      .create({ data })
      .catch(handleErrorUnique);

    return newTable;
  }

  findAll(): Promise<Table[]> {
    return this.prisma.table.findMany();
  }

  async veriflyIdAndReturnTable(id: number) {
    const module = await this.prisma.table.findUnique({ where: { id } });

    if (!module) {
      throw new NotFoundException(`id ${id} not found`);
    }

    return module;
  }

  findOne(@Param('id') id: number): Promise<Table> {
    return this.veriflyIdAndReturnTable(id);
  }

  async update(
    id: number,
    updateTableDto: UpdateTableDto,
  ): Promise<Table | void> {
    await this.veriflyIdAndReturnTable(id);

    return this.prisma.table
      .update({ where: { id }, data: updateTableDto })
      .catch(handleErrorUnique);
  }

  async remove(id: number) {
    await this.veriflyIdAndReturnTable(id);

    return this.prisma.table.delete({
      where: { id },
      select: { number: true },
    });
  }
}
