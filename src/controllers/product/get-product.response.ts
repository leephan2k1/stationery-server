import { ApiProperty } from '@nestjs/swagger';
import { BasePagingResponse, BaseResponse } from 'src/common/response';
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

export class GetProductsResponse extends BasePagingResponse {
  @ApiProperty()
  data: ProductModel[];

  constructor(data: ProductModel[], count?: number) {
    super(true, null, count);
    this.data = data;
  }

  static of(data: ProductModel[], count?: number): GetProductsResponse {
    return new GetProductsResponse(data, count);
  }
}
