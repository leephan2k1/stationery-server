import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Put,
  Post,
  Res,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { BrandService } from '../../services/brand.service';
import { PostBrandRequest } from './post-brand.request';
import { PostBrandResponse } from './post-brand.response';
import { ApiMessage, BaseResponse } from 'src/common/response';
import { GetBrandResponse } from './get-brand.response';
import { PutBrandRequest } from './put-brand.request';

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
  @ApiResponse({ status: HttpStatus.OK, type: GetBrandResponse })
  async findOne(@Param('id') id: string, @Res() res: Response) {
    const model = await this.brandService.findOne(id);

    return res.status(HttpStatus.OK).send(GetBrandResponse.of(model));
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() reqBody: PutBrandRequest) {
    return this.brandService.update(id, reqBody);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.brandService.remove(+id);
  }
}
