import { ApiProperty } from '@nestjs/swagger';
import { ApiMessage } from './api.message';

/**
 * Base DTO
 */
export class BaseResponse {
  @ApiProperty()
  ok: boolean;
  @ApiProperty({ type: [ApiMessage] })
  messages: ApiMessage[];

  constructor(ok?: boolean, messages?: ApiMessage[]) {
    this.ok = ok;
    this.messages = messages;
  }
}
