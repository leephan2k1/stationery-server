import { ApiProperty } from '@nestjs/swagger';
import { BaseResponse } from 'src/common/response';
import { UserModel } from 'src/models/User.model';

export class PostUserResponse extends BaseResponse {
  @ApiProperty()
  data: UserModel;

  constructor(data: UserModel) {
    super(true, null);
    this.data = data;
  }

  static of(data: UserModel): PostUserResponse {
    return new PostUserResponse(data);
  }
}
