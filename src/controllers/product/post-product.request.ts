import { ApiProperty } from '@nestjs/swagger';
import mongoose from 'mongoose';
import { Product } from 'src/schemas/Product.schema';

export class PostProductRequest {
  @ApiProperty()
  name: string;

  @ApiProperty()
  category: string;

  @ApiProperty()
  specific_properties: object;

  @ApiProperty()
  supplier: string;

  @ApiProperty()
  brand: string;

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
  description: string;

  createEntity({ withoutId }: { withoutId?: boolean }): Product {
    const entity = new Product();
    if (!withoutId) {
      entity._id = new mongoose.Types.ObjectId();
    }
    entity.name = this.name.toLocaleLowerCase();

    entity.category = new mongoose.Types.ObjectId(String(this.category));
    entity.supplier = new mongoose.Types.ObjectId(String(this.supplier));
    entity.brand = new mongoose.Types.ObjectId(String(this.brand));

    entity.specific_properties = this.specific_properties;
    entity.price = this.price;
    entity.weight = this.weight;
    entity.thumbnail = this.thumbnail;
    entity.discount_percent = this.discount_percent;
    entity.images = this.images;
    entity.description = this.description;

    return entity;
  }
}
