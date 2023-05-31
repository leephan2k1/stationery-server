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
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { BrandService } from '../../services/brand.service';
import { PostBrandRequest } from './post-brand.request';
import { PostBrandResponse } from './post-brand.response';
import { ApiMessage, BaseResponse } from 'src/common/response';

@ApiTags('brands')
@Controller('brands')
export class BrandController {
  constructor(private readonly brandService: BrandService) {}

  @Post()
  @ApiResponse({ status: HttpStatus.CREATED, type: PostBrandResponse })
  async create(@Body() reqBody: PostBrandRequest, @Res() res: Response) {
    const errs: ApiMessage[] = await this.brandService.validatePostBody(
      reqBody,
    );

    if (errs && errs.length > 0) {
      return res
        .status(HttpStatus.BAD_REQUEST)
        .send(new BaseResponse(false, errs));
    }

    const model = await this.brandService.create(reqBody);

    return res.status(HttpStatus.CREATED).send(PostBrandResponse.of(model));
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.brandService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string) {
    return this.brandService.update(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.brandService.remove(+id);
  }
}
