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
import { ApiResponse } from '@nestjs/swagger';
import { Response } from 'express';
import { SupplierService } from 'src/services/supplier.service';
import { PatchSupplierRequest } from './patch-supplier.request';
import { PostSupplierRequest } from './post-supplier.request';
import { PostSupplierResponse } from './post-supplier.response';

@Controller('supplier')
export class SupplierController {
  constructor(private readonly supplierService: SupplierService) {}

  @Post()
  @ApiResponse({ status: HttpStatus.CREATED, type: PostSupplierResponse })
  async create(
    @Body() createSupplierDto: PostSupplierRequest,
    @Res() res: Response,
  ) {
    const errors = await this.supplierService.validatePostSupplier(
      createSupplierDto,
    );

    if (errors && errors.length > 0) {
      return res.status(HttpStatus.BAD_REQUEST).send({ message: errors });
    }

    const supplier = await this.supplierService.create(createSupplierDto);

    return res.status(HttpStatus.CREATED).send(supplier);
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
