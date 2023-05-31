import { ApiProperty } from '@nestjs/swagger';
import { ApiMessage } from './api.message';

/**
 * Base DTO for paging
 */
export class BasePagingResponse {
  @ApiProperty()
  ok: boolean;
  @ApiProperty({ type: [ApiMessage] })
  messages: ApiMessage[];
  @ApiProperty()
  count: number;

  constructor(ok?: boolean, messages?: ApiMessage[], count?: number) {
    this.ok = ok;
    this.messages = messages;
    this.count = count;
  }
}
