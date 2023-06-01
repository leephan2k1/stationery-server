import { Injectable } from '@nestjs/common';
import { PostWarehouseRequest } from 'src/controllers/warehouse/post-warehouse.request';
import { WarehouseModel } from 'src/models/Warehouse.model';
import { WarehouseRepository } from 'src/repositories/warehouse.repository';

@Injectable()
export class WarehouseService {
  constructor(private readonly warehouseRepo: WarehouseRepository) {}

  async create(reqBody: PostWarehouseRequest) {
    const entity = reqBody.createEntity({ withoutId: false });
    const model = await this.warehouseRepo.save(entity);

    return WarehouseModel.fromEntity(model);
  }

  findAll() {
    return `This action returns all warehouse`;
  }

  findOne(id: number) {
    return `This action returns a #${id} warehouse`;
  }

  update(id: number) {
    return `This action updates a #${id} warehouse`;
  }

  remove(id: number) {
    return `This action removes a #${id} warehouse`;
  }

  async validatePostRequest({ name, location }: PostWarehouseRequest) {
    const errs = [];

    if (!name) {
      errs.push('name is missing');
    }

    if (!location) {
      errs.push('location is missing');
    }

    return errs.length > 0 ? errs : null;
  }
}
