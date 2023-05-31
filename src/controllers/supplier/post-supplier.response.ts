import { ApiProperty } from '@nestjs/swagger';
import { BaseResponse } from 'src/common/response';
import { SupplierModel } from 'src/models/Supplier.model';

export class PostSupplierResponse extends BaseResponse {
  @ApiProperty({ type: SupplierModel })
  data: SupplierModel;

  constructor(data: SupplierModel) {
    super(true, null);
    this.data = data;
  }

  static of(data: SupplierModel): PostSupplierResponse {
    return new PostSupplierResponse(data);
  }
}
