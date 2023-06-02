import { UserModel } from 'src/models/User.model';
import { PostUserResponse } from './post-user.response';
import { BasePagingResponse } from 'src/common/response';
import { ApiProperty } from '@nestjs/swagger';

export class GetUserResponse extends PostUserResponse {}

export class GetUsersResponse extends BasePagingResponse {
  @ApiProperty()
  data: UserModel[];

  constructor(data: UserModel[], count?: number) {
    super(true, null, count);
    this.data = data;
  }

  static of(data: UserModel[], count?: number): GetUsersResponse {
    return new GetUsersResponse(data, count);
  }
}
