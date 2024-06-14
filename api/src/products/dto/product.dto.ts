import { ApiProperty } from '@nestjs/swagger';

export class ProductDto {
  @ApiProperty()
  readonly id: number;

  @ApiProperty()
  readonly brand: string;

  @ApiProperty()
  readonly model: string;

  @ApiProperty()
  readonly description: string;

  @ApiProperty()
  readonly image: string;

  @ApiProperty()
  readonly price: number;

  @ApiProperty()
  readonly capacity: number;

  @ApiProperty()
  readonly colors: any;

  @ApiProperty()
  readonly quickShifter: boolean;

  @ApiProperty()
  readonly tires: [string];
}
