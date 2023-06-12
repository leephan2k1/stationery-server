import { ApiProperty } from '@nestjs/swagger';

export abstract class BaseQuery {
  @ApiProperty()
  limit?: number;

  @ApiProperty()
  page?: number;

  @ApiProperty()
  sort?: 'desc' | 'asc';
}
