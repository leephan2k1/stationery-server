import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { Supplier, SupplierDocument } from 'src/schemas/Supplier.schema';

@Injectable()
export class SupplierRepository {
  constructor(
    @InjectModel(Supplier.name)
    private model: Model<SupplierDocument>,
  ) {}

  async save(supplier: Supplier): Promise<Supplier> {
    return this.model.create(supplier);
  }

  async update(id: string, supplier: Supplier): Promise<Supplier> {
    return this.model.findByIdAndUpdate(
      new mongoose.Types.ObjectId(id),
      supplier,
      {
        new: true,
      },
    );
  }

  async findById(id: string): Promise<Supplier> {
    let supplier;
    try {
      supplier = await this.model
        .findById(new mongoose.Types.ObjectId(id))
        .exec();
    } catch (error) {
      throw new BadRequestException(error);
    }

    if (!supplier) {
      throw new NotFoundException('supplier not found');
    }

    return supplier;
  }

  async findAll(): Promise<Supplier[]> {
    let suppliers;
    try {
      suppliers = await this.model.find().exec();
    } catch (error) {
      throw new InternalServerErrorException(error);
    }

    return suppliers;
  }

  async delete(id: string): Promise<Supplier> {
    let supplier;
    try {
      supplier = await this.model
        .findByIdAndDelete(new mongoose.Types.ObjectId(id))
        .exec();
    } catch (error) {
      throw new BadRequestException(error);
    }

    if (!supplier) {
      throw new NotFoundException('supplier not found');
    }

    return supplier;
  }
}
