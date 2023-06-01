import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Warehouse, WarehouseDocument } from 'src/schemas/Warehouse.schema';

@Injectable()
export class WarehouseRepository {
  constructor(
    @InjectModel(Warehouse.name)
    private readonly model: Model<WarehouseDocument>,
  ) {}

  async save(reqBody: Warehouse): Promise<Warehouse> {
    return this.model.create(reqBody);
  }
}
