import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsPositive } from 'class-validator';

export class CreateOrderDto {
  @ApiProperty({
    description: 'number for order',
    example: 1,
  })
  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  number: number;
}
