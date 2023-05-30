import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { PostSupplierRequest } from 'src/controllers/supplier/post-supplier.request';
import { Supplier } from 'src/schemas/Supplier.schema';

@Injectable()
export class SupplierRepository {
  constructor(
    @InjectModel(Supplier.name) private readonly supplierModel: Model<Supplier>,
  ) {}

  async createNewSupplier(supplierDto: PostSupplierRequest) {
    return await this.supplierModel.create({
      _id: new mongoose.Types.ObjectId(),
      name: supplierDto.name,
      country: supplierDto.country,
      createdBy: new mongoose.Types.ObjectId(supplierDto.createdBy),
    });
  }
}
