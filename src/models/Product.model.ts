import { ApiProperty } from '@nestjs/swagger';
import { Product } from 'src/schemas/Product.schema';
import { BrandModel } from './Brand.model';
import { CategoryModel } from './Category.model';
import { SupplierModel } from './Supplier.model';
import { UserModel } from './User.model';
import { CreatorModel } from './shared/Creator.model';
import { Brand } from 'src/schemas/Brand.schema';
import { User } from 'src/schemas/User.schema';

export class ProductModel extends CreatorModel {
  @ApiProperty()
  name: string;

  @ApiProperty()
  product_slug: string;

  @ApiProperty()
  sku: string;

  @ApiProperty({ type: () => CategoryModel })
  category: CategoryModel;

  @ApiProperty({ type: () => SupplierModel })
  supplier: SupplierModel;

  @ApiProperty({ type: () => BrandModel })
  brand: BrandModel;

  @ApiProperty()
  specific_properties: object;

  @ApiProperty()
  price: number;

  @ApiProperty()
  weight: number;

  @ApiProperty()
  size: string;

  @ApiProperty()
  thumbnail: string;

  @ApiProperty()
  discount_percent: number;

  @ApiProperty()
  images: string[];

  @ApiProperty()
  stock_available: boolean;

  @ApiProperty()
  description: string;

  static fromEntity(product: Product) {
    if (!product) return null;

    const model = new ProductModel();
    model.id = product._id.toString();
    model.name = product.name;
    model.product_slug = product.product_slug;

    if (product.brand instanceof Brand) {
      model.brand = BrandModel.fromEntity(product.brand);
    }
    if (product.createdBy instanceof User) {
      model.createdBy = UserModel.fromEntity(product.createdBy);
    }
    if (product.updatedBy instanceof User) {
      model.updatedBy = UserModel.fromEntity(product.updatedBy);
    }

    model.specific_properties = product.specific_properties;
    model.price = product.price;
    model.thumbnail = product.thumbnail;
    model.discount_percent = product.discount_percent;
    model.images = product.images;
    model.stock_available = product.stock_available;
    model.description = product.description;

    return model;
  }
}
