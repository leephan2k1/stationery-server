import { ApiProperty } from '@nestjs/swagger';
import { Warehouse } from 'src/schemas/Warehouse.schema';
import mongoose from 'mongoose';
import { ProductInStock } from 'src/common/interfaces/productInStock.interface';

export class PostWarehouseRequest {
  @ApiProperty()
  name: string;

  @ApiProperty()
  location: string;

  @ApiProperty()
  products?: ProductInStock[];

  constructor(name: string, location: string) {
    this.name = name;
    this.location = location;
  }

  public createEntity({ withoutId }: { withoutId?: boolean }): Warehouse {
    const entity = new Warehouse();

    if (!withoutId) {
      entity._id = new mongoose.Types.ObjectId();
    }

    entity.products = this.products;
    entity.name = this.name;
    entity.location = this.location;
    return entity;
  }
}
