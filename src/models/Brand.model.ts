import { ApiProperty } from '@nestjs/swagger';
import { ProductModel } from './Product.model';
import { CreatorModel } from './shared/Creator.model';
import { Brand } from 'src/schemas/Brand.schema';

export class BrandModel extends CreatorModel {
  @ApiProperty()
  name: string;

  @ApiProperty()
  products: ProductModel[];

  static fromEntity(brand: Brand) {
    if (!brand) return null;

    const model = new BrandModel();
    model.id = brand._id.toString();
    model.name = brand.name;

    return model;
  }
}
