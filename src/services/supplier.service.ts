import { Injectable } from '@nestjs/common';
import { CreateSupplierDto } from '../dtos/supplier/create-supplier.dto';
import { UpdateSupplierDto } from '../dtos/supplier/update-supplier.dto';
import { SupplierRepository } from 'src/repositories/supplier.repository';
import { SupplierModel } from 'src/models/Supplier.model';

@Injectable()
export class SupplierService {
  constructor(private readonly supplierRepo: SupplierRepository) {}

  async create(createSupplierDto: CreateSupplierDto): Promise<SupplierModel> {
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

  update(id: number, updateSupplierDto: UpdateSupplierDto) {
    return `This action updates a #${id} supplier`;
  }

  remove(id: number) {
    return `This action removes a #${id} supplier`;
  }
}
