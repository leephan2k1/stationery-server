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
import { ProductService } from '../../services/product.service';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { GetProductResponse, PostProductRequest, PostProductResponse } from '.';
import { ApiMessage, BaseResponse } from 'src/common/response';
import { Response } from 'express';

@ApiTags('products')
@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  @ApiResponse({ status: HttpStatus.CREATED, type: PostProductResponse })
  async create(@Body() reqBody: PostProductRequest, @Res() res: Response) {
    const errs: ApiMessage[] = await this.productService.validatePostBody(
      reqBody,
    );

    if (errs && errs.length > 0) {
      return res
        .status(HttpStatus.BAD_REQUEST)
        .send(new BaseResponse(false, errs));
    }

    const model = await this.productService.create(reqBody);

    return res.status(HttpStatus.CREATED).send(PostProductResponse.of(model));
  }

  @Get()
  findAll() {
    return this.productService.findAll();
  }

  @Get(':slug')
  @ApiResponse({ status: HttpStatus.OK, type: GetProductResponse })
  async findOne(@Param('slug') slug: string, @Res() res: Response) {
    const model = await this.productService.findOne(slug);

    return res.status(HttpStatus.OK).send(GetProductResponse.of(model));
  }

  @Patch(':id')
  update(@Param('id') id: string) {
    return this.productService.update(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productService.remove(+id);
  }
}
