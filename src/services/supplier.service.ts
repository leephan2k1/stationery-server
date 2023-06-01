import { Injectable } from '@nestjs/common';
import { PatchSupplierRequest } from 'src/controllers/supplier/patch-supplier.request';
import { SupplierRepository } from 'src/repositories/supplier.repository';
import { SupplierModel } from 'src/models/Supplier.model';
import { PostSupplierRequest } from 'src/controllers/supplier';

@Injectable()
export class SupplierService {
  constructor(private readonly supplierRepo: SupplierRepository) {}

  async create(requestBody: PostSupplierRequest): Promise<SupplierModel> {
    const supplierEntity = requestBody.createEntity();
    const supplierModel = await this.supplierRepo.save(supplierEntity);
    return SupplierModel.fromEntity(supplierModel);
  }

  async validateBodySupplier({
    name,
    country,
  }: {
    name?: string;
    country?: string;
  }) {
    const errors = [];

    if (!name) {
      errors.push('name is missing');
    }
    if (name && name.length === 0) {
      errors.push('name must be longer than or equal 1 character');
    }
    if (name && name.length > 150) {
      errors.push('name must be shorter than or equal 150 characters');
    }

    if (!country) {
      errors.push('country is missing');
    }
    if (country && country.length === 0) {
      errors.push('country must be longer than or equal 1 character');
    }
    if (country && country.length > 150) {
      errors.push('country must be shorter than or equal 150 characters');
    }

    return errors.length > 0 ? errors : null;
  }

  async findOne(id: string): Promise<SupplierModel> {
    const model = await this.supplierRepo.findById(id);

    return SupplierModel.fromEntity(model);
  }

  async update(id: string, updateSupplierDto: PatchSupplierRequest) {
    const supplierEntity = updateSupplierDto.createEntityWithoutId();
    const supplierModel = await this.supplierRepo.update(id, supplierEntity);
    return SupplierModel.fromEntity(supplierModel);
  }

  remove(id: number) {
    return `This action removes a #${id} supplier`;
  }
}
