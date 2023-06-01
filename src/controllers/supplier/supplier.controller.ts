import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Put,
  Post,
  Res,
} from '@nestjs/common';
import { UseInterceptors } from '@nestjs/common/decorators';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { ApiMessage, BaseResponse } from 'src/common/response';
import { SupplierService } from 'src/services/supplier.service';
import { GetSupplierResponse } from './get-supplier.response';
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
  @ApiResponse({ status: HttpStatus.CREATED, type: PostSupplierResponse })
  public async create(
    @Res() res: Response,
    @Body() requestBody: PostSupplierRequest,
  ) {
    const errs: ApiMessage[] = await this.supplierService.validateBodySupplier(
      requestBody,
    );
    if (errs && errs.length > 0) {
      return res
        .status(HttpStatus.BAD_REQUEST)
        .send(new BaseResponse(false, errs));
    }
    const model = await this.supplierService.create(requestBody);
    return res.status(HttpStatus.CREATED).send(PostSupplierResponse.of(model));
  }

  @Get(':id')
  @ApiResponse({ status: HttpStatus.OK, type: GetSupplierResponse })
  async findOne(@Param('id') id: string, @Res() res: Response) {
    const model = await this.supplierService.findOne(id);

    return res.status(HttpStatus.OK).send(GetSupplierResponse.of(model));
  }

  @Put(':id')
  @ApiResponse({ status: HttpStatus.OK, type: GetSupplierResponse })
  async update(
    @Param('id') id: string,
    @Body() updateSupplierDto: PatchSupplierRequest,
    @Res() res: Response,
  ) {
    const errs: ApiMessage[] = await this.supplierService.validateBodySupplier({
      name: updateSupplierDto.name,
      country: updateSupplierDto.country,
    });
    if (errs && errs.length > 0) {
      return res
        .status(HttpStatus.BAD_REQUEST)
        .send(new BaseResponse(false, errs));
    }

    const model = await this.supplierService.update(id, updateSupplierDto);

    return res.status(HttpStatus.OK).send(GetSupplierResponse.of(model));
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.supplierService.remove(+id);
  }
}
