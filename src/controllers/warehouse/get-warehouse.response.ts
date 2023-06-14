import { ApiProperty } from '@nestjs/swagger';
import { BasePagingResponse, BaseResponse } from 'src/common/response';
import { WarehouseModel } from 'src/models/Warehouse.model';

export class GetWarehouseResponse extends BaseResponse {
  @ApiProperty({ type: WarehouseModel })
  data: WarehouseModel;

  constructor(data: WarehouseModel) {
    super(true, null);
    this.data = data;
  }

  static of(data: WarehouseModel): GetWarehouseResponse {
    return new GetWarehouseResponse(data);
  }
}

export class GetWarehousesResponse extends BasePagingResponse {
  @ApiProperty()
  data: WarehouseModel[];

  constructor(data: WarehouseModel[], count?: number) {
    super(true, null, count);
    this.data = data;
  }

  static of(data: WarehouseModel[], count?: number): GetWarehousesResponse {
    return new GetWarehousesResponse(data, count);
  }
}
