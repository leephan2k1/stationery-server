import { Injectable } from '@nestjs/common';
import { GetWarehouseQuery } from 'src/controllers/warehouse/get-warehouse.query';
import { PostWarehouseRequest } from 'src/controllers/warehouse/post-warehouse.request';
import { WarehouseModel } from 'src/models/Warehouse.model';
import { WarehouseRepository } from 'src/repositories/warehouse.repository';

@Injectable()
export class WarehouseService {
  constructor(private readonly warehouseRepo: WarehouseRepository) {}

  async create(
    reqBody: PostWarehouseRequest,
    userId: string,
  ): Promise<WarehouseModel> {
    const entity = reqBody.createEntity({ withoutId: false });
    entity.setCreatedBy(userId);
    const model = await this.warehouseRepo.save(entity);

    return WarehouseModel.fromEntity(model);
  }

  async findMany(queries: GetWarehouseQuery) {
    if (!queries.limit) queries.limit = 0;
    if (!queries.page) queries.page = 1;

    const { warehouses, count } = await this.warehouseRepo.findAll(queries);

    return {
      warehouses: warehouses.map((model) => WarehouseModel.fromEntity(model)),
      count,
    };
  }
  async findOne(id: string): Promise<WarehouseModel> {
    const model = await this.warehouseRepo.findWarehouseById(id);
    return WarehouseModel.fromEntity(model);
  }

  async update(
    id: string,
    reqBody: PostWarehouseRequest,
    userId: string,
  ): Promise<WarehouseModel> {
    const entity = reqBody.createEntity({ withoutId: true });
    entity.setUpdatedBy(userId);
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
