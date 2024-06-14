import { ApiProperty } from '@nestjs/swagger';

export class ProductInput {
  @ApiProperty()
  brand: string;

  @ApiProperty()
  model: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  image: string;

  @ApiProperty()
  price: number;

  @ApiProperty()
  capacity: number;

  @ApiProperty()
  colors: any;

  @ApiProperty()
  quickShifter: boolean;

  @ApiProperty()
  tires: [string];
}
