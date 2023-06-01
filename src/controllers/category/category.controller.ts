import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Patch,
  Post,
  Res,
} from '@nestjs/common';
import { CategoryService } from '../../services/category.service';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { PostCategoryRequest } from './post-category.request';
import { Response } from 'express';
import { ApiMessage, BaseResponse } from 'src/common/response';
import { PostCategoryResponse } from './post-category.response';
import { GetCategoryResponse } from './get-category.response';

@ApiTags('categories')
@Controller('categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  @ApiResponse({ status: HttpStatus.CREATED, type: PostCategoryResponse })
  async create(@Body() reqBody: PostCategoryRequest, @Res() res: Response) {
    const errs: ApiMessage[] = await this.categoryService.validateBody({
      name: reqBody.name,
      parentCategory: reqBody?.parentCategory,
    });

    if (errs && errs.length > 0) {
      return res
        .status(HttpStatus.BAD_REQUEST)
        .send(new BaseResponse(false, errs));
    }

    const model = await this.categoryService.create(reqBody);

    return res.status(HttpStatus.CREATED).send(PostCategoryResponse.of(model));
  }

  @Get(':slug')
  @ApiResponse({ status: HttpStatus.CREATED, type: GetCategoryResponse })
  async findOne(@Param('slug') slug: string, @Res() res: Response) {
    const model = await this.categoryService.findOne(slug);

    return res.status(HttpStatus.OK).send(PostCategoryResponse.of(model));
  }

  @Patch(':id')
  update(@Param('id') id: string) {
    return this.categoryService.update(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.categoryService.remove(+id);
  }
}
