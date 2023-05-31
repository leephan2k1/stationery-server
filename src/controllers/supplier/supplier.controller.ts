import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Patch,
  Post,
  Res,
} from '@nestjs/common';
import { Req, UseInterceptors } from '@nestjs/common/decorators';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { ApiMessage, BaseResponse } from 'src/common/response';
import { SupplierService } from 'src/services/supplier.service';
import { PatchSupplierRequest } from './patch-supplier.request';
import { PostSupplierRequest } from './post-supplier.request';
import { PostSupplierResponse } from './post-supplier.response';

@ApiTags('suppliers')
@Controller('suppliers')
@UseInterceptors(ClassSerializerInterceptor)
export class SupplierController {
  constructor(private readonly supplierService: SupplierService) {}

  /**
   * Add new supplier
   * @param res
   * @param requestBody
   * @returns
   */
  @Post()
  @ApiOperation({ operationId: 'addSupplier' })
  @ApiResponse({ status: HttpStatus.OK, type: PostSupplierResponse })
  public async create(
    @Req() req: Express.Request,
    @Res() res: any,
    @Body() requestBody: PostSupplierRequest,
  ) {
    const errs: ApiMessage[] = await this.supplierService.validatePostSupplier(
      requestBody,
    );
    if (errs && errs.length > 0) {
      return res
        .status(HttpStatus.BAD_REQUEST)
        .send(new BaseResponse(false, errs));
    }
    const model = await this.supplierService.create(requestBody);
    return res.status(HttpStatus.OK).send(PostSupplierResponse.of(model));
  }

  @Get()
  findAll() {
    return this.supplierService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.supplierService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateSupplierDto: PatchSupplierRequest,
  ) {
    return this.supplierService.update(+id, updateSupplierDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.supplierService.remove(+id);
  }
}
