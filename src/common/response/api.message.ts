import { ApiProperty } from '@nestjs/swagger';

/**
 * ApiMessage DTO
 */
export class ApiMessage {
  @ApiProperty()
  field: string;

  @ApiProperty()
  title: string;

  @ApiProperty()
  code: string;

  constructor(code?: string, field?: string, title?: string) {
    this.code = code;
    this.field = field;
    this.title = title;
  }

  static of(field?: string, title?: string) {
    return new ApiMessage(field, title);
  }

  static of3(code?: string, field?: string, title?: string) {
    return new ApiMessage(code, field, title);
  }
}
