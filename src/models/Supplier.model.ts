import { ApiProperty } from '@nestjs/swagger';
import { ProductModel } from './Product.model';
import { CreatorModel } from './shared/Creator.model';
import { Supplier } from 'src/schemas/Supplier.schema';

export class SupplierModel extends CreatorModel {
  @ApiProperty()
  name: string;

  @ApiProperty()
  country: string;

  @ApiProperty()
  products: ProductModel[];

  static fromEntity(supplier: Supplier) {
    if (!supplier) return null;

    const model = new SupplierModel();
    model.id = supplier._id.toString();
    model.name = supplier.name;
    model.country = supplier.country;

    if (supplier.products) {
      model.products = supplier.products.map((e) => {
        return ProductModel.fromEntity(e);
      });
    }

    return model;
  }
}
