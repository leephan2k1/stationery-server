import { ApiProperty } from '@nestjs/swagger';
import { BaseResponse } from 'src/common/response';
import { ProductModel } from 'src/models/Product.model';

export class GetProductResponse extends BaseResponse {
  @ApiProperty()
  data: ProductModel;

  constructor(data: ProductModel) {
    super(true, null);
    this.data = data;
  }

  static of(data: ProductModel): GetProductResponse {
    return new GetProductResponse(data);
  }
}
