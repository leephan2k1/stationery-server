import { ApiProperty } from '@nestjs/swagger';
import mongoose from 'mongoose';
import { Supplier } from 'src/schemas/Supplier.schema';

export class PostSupplierRequest {
  @ApiProperty()
  name: string;

  @ApiProperty()
  country: string;

  constructor(name: string, country: string) {
    this.name = name;
    this.country = country;
  }

  public createEntity(): Supplier {
    const entity = new Supplier();
    entity.name = this.name;
    entity.country = this.country;
    entity._id = new mongoose.Types.ObjectId();
    return entity;
  }
}
