import { Injectable } from '@nestjs/common';
import { PostSupplierRequest } from 'src/controllers/supplier/post-supplier.request';
import { PatchSupplierRequest } from 'src/controllers/supplier/patch-supplier.request';
import { SupplierRepository } from 'src/repositories/supplier.repository';
import { SupplierModel } from 'src/models/Supplier.model';

@Injectable()
export class SupplierService {
  constructor(private readonly supplierRepo: SupplierRepository) {}

  async create(createSupplierDto: PostSupplierRequest): Promise<SupplierModel> {
    const supplierModel = await this.supplierRepo.createNewSupplier(
      createSupplierDto,
    );

    return SupplierModel.fromEntity(supplierModel);
  }

  async validatePostSupplier({
    name,
    country,
    createdBy,
  }: PostSupplierRequest) {
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

    if (!createdBy) {
      errors.push('createdBy is missing');
    }
    if (createdBy && !createdBy.match(/^[a-f\d]{24}$/i)) {
      errors.push('createdBy is not mongodb id');
    }

    return errors.length > 0 ? errors : null;
  }

  findAll() {
    return `This action returns all supplier`;
  }

  findOne(id: number) {
    return `This action returns a #${id} supplier`;
  }

  update(id: number, updateSupplierDto: PatchSupplierRequest) {
    return `This action updates a #${id} supplier`;
  }

  remove(id: number) {
    return `This action removes a #${id} supplier`;
  }
}
