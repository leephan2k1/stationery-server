import { ApiProperty } from '@nestjs/swagger';
import { BaseResponse } from 'src/common/response';
import { ProductModel } from 'src/models/Product.model';

export class PostProductResponse extends BaseResponse {
  @ApiProperty({ type: ProductModel })
  data: ProductModel;

  constructor(data: ProductModel) {
    super(true, null);
    this.data = data;
  }

  static of(data: ProductModel): PostProductResponse {
    return new PostProductResponse(data);
  }
}
