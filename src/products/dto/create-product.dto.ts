import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, IsUrl, IsUUID } from 'class-validator';

export class CreateProductDto {
  @ApiProperty({
    description: 'name of product',
    example: ' toothed belt',
  })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    description: 'description of product',
    example:
      'toothed belTiming chain is used to synchronize the rotation of the crankshaft and camshaft',
  })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({
    description: 'price of product',
    example: 15.35,
  })
  @IsNumber({
    maxDecimalPlaces: 2,
  })
  price: number;

  @ApiProperty({
    description: 'image of product',
    example:
      ' https://www.idolz.com/wp-content/uploads/2021/09/blog-dolz-min-1.jpg',
  })
  @IsUrl()
  image: string;

  @ApiProperty({
    description: 'foreign key, get from category',
    example: 'd298b53a-e44e-4eda-a248-66dd0f361e4d',
  })
  @IsUUID()
  categoryId: string;
}
