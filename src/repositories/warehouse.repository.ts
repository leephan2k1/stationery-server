import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
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

  async findWarehouseById(id: string) {
    let warehouse;
    try {
      warehouse = await this.model
        .findById(new mongoose.Types.ObjectId(id))
        .exec();
    } catch (error) {
      throw new BadRequestException(error);
    }

    if (!warehouse) {
      throw new NotFoundException('supplier not found');
    }

    return warehouse;
  }

  async deleteWarehouseById(id: string) {
    let warehouse;
    try {
      warehouse = await this.model
        .findByIdAndDelete(new mongoose.Types.ObjectId(id))
        .exec();
    } catch (error) {
      throw new BadRequestException(error);
    }

    if (!warehouse) {
      throw new NotFoundException('supplier not found');
    }

    return warehouse;
  }

  async updateWarehouseById(
    id: string,
    { name, location, products }: Warehouse,
  ) {
    let warehouse;
    try {
      warehouse = await this.model
        .findByIdAndUpdate(
          new mongoose.Types.ObjectId(id),
          {
            $addToSet: { products: { $each: products } },
            name,
            location,
          },
          { new: true },
        )
        .exec();
    } catch (error) {
      throw new BadRequestException(error);
    }

    if (!warehouse) {
      throw new NotFoundException('supplier not found');
    }

    return warehouse;
  }
}
