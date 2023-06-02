import { ApiProperty } from '@nestjs/swagger';
import { BaseResponse } from 'src/common/response';
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
