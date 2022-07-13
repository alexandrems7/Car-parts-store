import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateTableDto } from './dto/create-table.dto';
import { UpdateTableDto } from './dto/update-table.dto';
import { Table } from './entities/table.entity';
import { TableService } from './table.service';

@ApiTags('table')
@Controller('table')
export class TableController {
  constructor(private readonly tableService: TableService) {}

  @ApiOperation({ summary: 'register new order' })
  @Post()
  create(@Body() createtableDto: CreateTableDto): Promise<Table | void> {
    return this.tableService.create(createtableDto);
  }

  @ApiOperation({ summary: 'list all orders present in the database' })
  @Get()
  findAll(): Promise<Table[]> {
    return this.tableService.findAll();
  }

  @ApiOperation({ summary: 'search an order for id' })
  @Get(':id')
  findOne(@Param('id') id: number): Promise<Table> {
    return this.tableService.findOne(+id);
  }

  @ApiOperation({ summary: 'update an order' })
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateTableDto: UpdateTableDto,
  ): Promise<Table | void> {
    return this.tableService.update(+id, updateTableDto);
  }

  @ApiOperation({ summary: 'delete a product' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tableService.remove(+id);
  }
}
