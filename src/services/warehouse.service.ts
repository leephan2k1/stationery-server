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

  async update(
    id: string,
    reqBody: PostWarehouseRequest,
  ): Promise<WarehouseModel> {
    const entity = reqBody.createEntity({ withoutId: true });
    const model = await this.warehouseRepo.updateWarehouseById(id, entity);

    return WarehouseModel.fromEntity(model);
  }

  async remove(id: string) {
    const model = await this.warehouseRepo.deleteWarehouseById(id);
    return WarehouseModel.fromEntity(model);
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
