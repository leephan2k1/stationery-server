import { ApiProperty } from '@nestjs/swagger';
import { BaseResponse } from 'src/common/response';
import { CategoryModel } from 'src/models/Category.model';

export class PostCategoryResponse extends BaseResponse {
  @ApiProperty()
  data: CategoryModel;

  constructor(data: CategoryModel) {
    super(true, null);
    this.data = data;
  }

  static of(data: CategoryModel): PostCategoryResponse {
    return new PostCategoryResponse(data);
  }
}
