import { ApiProperty } from '@nestjs/swagger';
import { BasePagingResponse, BaseResponse } from 'src/common/response';
import { SupplierModel } from 'src/models/Supplier.model';

export class GetSupplierResponse extends BaseResponse {
  @ApiProperty({ type: SupplierModel })
  data: SupplierModel;

  constructor(data: SupplierModel) {
    super(true, null);
    this.data = data;
  }

  static of(data: SupplierModel): GetSupplierResponse {
    return new GetSupplierResponse(data);
  }
}

export class GetSuppliersResponse extends BasePagingResponse {
  @ApiProperty({ type: SupplierModel })
  data: SupplierModel[];

  constructor(data: SupplierModel[], count?: number) {
    super(true, null, count);
    this.data = data;
  }

  static of(data: SupplierModel[], count?: number): GetSuppliersResponse {
    return new GetSuppliersResponse(data, count);
  }
}
