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
