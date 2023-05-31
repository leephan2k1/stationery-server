import { ApiProperty } from '@nestjs/swagger';
import { ProductInStock } from 'src/common/interfaces/productInStock.interface';
import { CreatorModel } from './shared/Creator.model';
import { Warehouse } from 'src/schemas/Warehouse.schema';

export class WarehouseModel extends CreatorModel {
  @ApiProperty()
  name: string;

  @ApiProperty()
  location: string;

  @ApiProperty()
  products: ProductInStock[];

  static fromEntity(warehouse: Warehouse) {
    if (!warehouse) return null;

    const model = new WarehouseModel();
    model.id = warehouse._id.toString();
    model.name = warehouse.name;
    model.location = warehouse.location;
    model.products = warehouse.products;

    return model;
  }
}
