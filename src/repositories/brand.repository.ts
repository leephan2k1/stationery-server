import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Brand, BrandDocument } from 'src/schemas/Brand.schema';

@Injectable()
export class BrandRepository {
  constructor(
    @InjectModel(Brand.name) private readonly model: Model<BrandDocument>,
  ) {}

  async save(brand: Brand): Promise<Brand> {
    return this.model.create(brand);
  }

  async findOne(id: string): Promise<Brand> {
    return this.model.findById(id);
  }
}
