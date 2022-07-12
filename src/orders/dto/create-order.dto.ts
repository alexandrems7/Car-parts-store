import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsPositive, IsUUID } from 'class-validator';

export class CreateOrderDto {
  @ApiProperty({
    description: 'order table number',
    example: '1',
  })
  @IsNumber()
  @IsPositive()
  tableNumber: number;

  @ApiProperty({
    description: 'user id, used to identify',
    example: '79afc834-9485-46bd-8f0b-61c7007fc128',
  })
  @IsUUID()
  userId: string;

  @ApiProperty({
    description: 'product array with all selected',
    example: '[ 79afc834-9485-46bd-8f0b-61c7007fc128 ]',
  })
  @IsUUID(undefined, { each: true })
  products: string[];
}
