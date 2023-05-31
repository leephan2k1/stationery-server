import { ApiProperty } from '@nestjs/swagger';
import { BaseResponse } from 'src/common/response';
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
