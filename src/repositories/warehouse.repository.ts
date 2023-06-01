import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Warehouse, WarehouseDocument } from 'src/schemas/Warehouse.schema';
import { ObjectId } from 'mongodb';

@Injectable()
export class WarehouseRepository {
  constructor(
    @InjectModel(Warehouse.name)
    private readonly model: Model<WarehouseDocument>,
  ) {}

  async save(reqBody: Warehouse): Promise<Warehouse> {
    return this.model.create(reqBody);
  }

  async findWarehouseById(id: string) {
    let warehouse;
    try {
      warehouse = await this.model.findById(new ObjectId(id)).exec();
    } catch (error) {
      throw new BadRequestException(error);
    }

    if (!warehouse) {
      throw new NotFoundException('supplier not found');
    }

    return warehouse;
  }
}
