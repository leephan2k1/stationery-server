import { ApiProperty } from '@nestjs/swagger';
import { Warehouse } from 'src/schemas/Warehouse.schema';
import mongoose from 'mongoose';

export class PostWarehouseRequest {
  @ApiProperty()
  name: string;

  @ApiProperty()
  location: string;

  constructor(name: string, location: string) {
    this.name = name;
    this.location = location;
  }

  public createEntity({ withoutId }: { withoutId?: boolean }): Warehouse {
    const entity = new Warehouse();

    if (!withoutId) {
      entity._id = new mongoose.Types.ObjectId();
    }

    entity.name = this.name;
    entity.location = this.location;
    return entity;
  }
}
