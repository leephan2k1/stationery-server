import { ApiProperty } from '@nestjs/swagger';

export class PostSupplierRequest {
  @ApiProperty()
  name: string;

  @ApiProperty()
  country: string;

  @ApiProperty()
  createdBy: string;
}
