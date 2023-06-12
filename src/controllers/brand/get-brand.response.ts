import { ApiProperty } from '@nestjs/swagger';
import { BasePagingResponse, BaseResponse } from 'src/common/response';
import { BrandModel } from 'src/models/Brand.model';

export class GetBrandResponse extends BaseResponse {
  @ApiProperty()
  data: BrandModel;

  constructor(data: BrandModel) {
    super(true, null);
    this.data = data;
  }

  static of(data: BrandModel): GetBrandResponse {
    return new GetBrandResponse(data);
  }
}

export class GetBrandsResponse extends BasePagingResponse {
  @ApiProperty()
  data: BrandModel[];

  constructor(data: BrandModel[], count?: number) {
    super(true, null, count);
    this.data = data;
  }

  static of(data: BrandModel[], count?: number): GetBrandsResponse {
    return new GetBrandsResponse(data, count);
  }
}
