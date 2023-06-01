import { Injectable } from '@nestjs/common';
import { PostWarehouseRequest } from 'src/controllers/warehouse/post-warehouse.request';
import { WarehouseModel } from 'src/models/Warehouse.model';
import { WarehouseRepository } from 'src/repositories/warehouse.repository';

@Injectable()
export class WarehouseService {
  constructor(private readonly warehouseRepo: WarehouseRepository) {}

  async create(reqBody: PostWarehouseRequest): Promise<WarehouseModel> {
    const entity = reqBody.createEntity({ withoutId: false });
    const model = await this.warehouseRepo.save(entity);

    return WarehouseModel.fromEntity(model);
  }

  findAll() {
    return `This action returns all warehouse`;
  }

  async findOne(id: string): Promise<WarehouseModel> {
    const model = await this.warehouseRepo.findWarehouseById(id);
    return WarehouseModel.fromEntity(model);
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
