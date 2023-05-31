import { ApiProperty } from '@nestjs/swagger';
import { ProductModel } from 'src/models/Product.model';

export class PostSupplierResponse {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  country: string;

  @ApiProperty()
  products: ProductModel[];
}
