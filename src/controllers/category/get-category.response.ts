import { ApiProperty } from '@nestjs/swagger';
import { BasePagingResponse, BaseResponse } from 'src/common/response';
import { CategoryModel } from 'src/models/Category.model';

export class GetCategoryResponse extends BaseResponse {
  @ApiProperty()
  data: CategoryModel;

  constructor(data: CategoryModel) {
    super(true, null);
    this.data = data;
  }

  static of(data: CategoryModel): GetCategoryResponse {
    return new GetCategoryResponse(data);
  }
}

export class GetCategoriesResponse extends BasePagingResponse {
  @ApiProperty()
  data: CategoryModel[];

  constructor(data: CategoryModel[], count?: number) {
    super(true, null, count);
    this.data = data;
  }

  static of(data: CategoryModel[], count?: number): GetCategoriesResponse {
    return new GetCategoriesResponse(data, count);
  }
}
