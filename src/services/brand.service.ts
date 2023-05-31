import { Injectable } from '@nestjs/common';
import { PostBrandRequest } from 'src/controllers/brand/post-brand.request';
import { BrandModel } from 'src/models/Brand.model';
import { BrandRepository } from 'src/repositories/brand.repository';

@Injectable()
export class BrandService {
  constructor(private readonly brandRepo: BrandRepository) {}

  async create(reqBody: PostBrandRequest): Promise<BrandModel> {
    const brandEntity = reqBody.createEntity();
    const brandModel = await this.brandRepo.save(brandEntity);
    return BrandModel.fromEntity(brandModel);
  }

  findOne(id: number) {
    return `This action returns a #${id} brand`;
  }

  update(id: number) {
    return `This action updates a #${id} brand`;
  }

  remove(id: number) {
    return `This action removes a #${id} brand`;
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
}
