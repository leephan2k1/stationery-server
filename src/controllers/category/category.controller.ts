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
  Put,
} from '@nestjs/common';
import { CategoryService } from '../../services/category.service';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { PostCategoryRequest } from './post-category.request';
import { Response } from 'express';
import { ApiMessage, BaseResponse } from 'src/common/response';
import { PostCategoryResponse } from './post-category.response';
import { GetCategoryResponse } from './get-category.response';
import { PutCategoryRequest } from './put-category.request';

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
  @ApiResponse({ status: HttpStatus.OK, type: GetCategoryResponse })
  async findOne(@Param('slug') slug: string, @Res() res: Response) {
    const model = await this.categoryService.findOne(slug);

    return res.status(HttpStatus.OK).send(PostCategoryResponse.of(model));
  }

  @Put(':slug')
  @ApiResponse({ status: HttpStatus.OK, type: GetCategoryResponse })
  async update(
    @Param('slug') slug: string,
    @Body() reqBody: PutCategoryRequest,
    @Res() res: Response,
  ) {
    const errs: ApiMessage[] = await this.categoryService.validateBody({
      name: reqBody.name,
      parentCategory: reqBody?.parentCategory,
    });

    if (errs && errs.length > 0) {
      return res
        .status(HttpStatus.BAD_REQUEST)
        .send(new BaseResponse(false, errs));
    }

    const model = await this.categoryService.update(slug, reqBody);

    return res.status(HttpStatus.OK).send(GetCategoryResponse.of(model));
  }

  @Delete(':slug')
  @ApiResponse({ status: HttpStatus.OK, type: GetCategoryResponse })
  async remove(@Param('slug') slug: string, @Res() res: Response) {
    const model = await this.categoryService.delete(slug);

    return res.status(HttpStatus.OK).send(GetCategoryResponse.of(model));
  }
}
