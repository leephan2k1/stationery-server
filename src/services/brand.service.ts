import { Injectable } from '@nestjs/common';
import { PostBrandRequest } from 'src/controllers/brand/post-brand.request';
import { PutBrandRequest } from 'src/controllers/brand/put-brand.request';
import { BrandModel } from 'src/models/Brand.model';
import { BrandRepository } from 'src/repositories/brand.repository';
import isEmptyObject from 'src/utils/checkEmptyObject';

@Injectable()
export class BrandService {
  constructor(private readonly brandRepo: BrandRepository) {}

  async create(reqBody: PostBrandRequest, userId: string): Promise<BrandModel> {
    const brandEntity = reqBody.createEntity();
    brandEntity.setCreatedBy(userId);
    const brandModel = await this.brandRepo.save(brandEntity);
    return BrandModel.fromEntity(brandModel);
  }

  async findOne(id: string): Promise<BrandModel> {
    const brandModel = await this.brandRepo.findById(id);

    return BrandModel.fromEntity(brandModel);
  }

  async update(
    id: string,
    reqBody: PutBrandRequest,
    userId: string,
  ): Promise<BrandModel> {
    const brandEntity = reqBody.createEntityWithoutId();
    brandEntity.setUpdatedBy(userId);
    const brandModel = await this.brandRepo.updateById(id, brandEntity);
    return BrandModel.fromEntity(brandModel);
  }

  async remove(id: string): Promise<BrandModel> {
    const deletedBrand = await this.brandRepo.deleteById(id);

    return BrandModel.fromEntity(deletedBrand);
  }

  async validatePostBody({ name }: PostBrandRequest) {
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

    return errors.length > 0 ? errors : null;
  }

  async validateUpdateBody(reqBody: PutBrandRequest) {
    const errors = [];

    if (isEmptyObject(reqBody)) {
      errors.push('body data at least 1 field');
    }

    if (reqBody?.name && reqBody.name === '') {
      errors.push('name must be longer than or equal 1 character');
    }

    if (reqBody?.name && reqBody.name.length > 150) {
      errors.push('name must be shorter than or equal 150 characters');
    }

    return errors.length > 0 ? errors : null;
  }
}
