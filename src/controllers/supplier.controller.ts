import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UsePipes,
  ValidationPipe,
  Res,
  HttpStatus,
} from '@nestjs/common';
import { SupplierService } from 'src/services/supplier.service';
import { CreateSupplierDto } from '../dtos/supplier/create-supplier.dto';
import { UpdateSupplierDto } from '../dtos/supplier/update-supplier.dto';
import { Response } from 'express';

@Controller('supplier')
export class SupplierController {
  constructor(private readonly supplierService: SupplierService) {}

  @Post()
  @UsePipes(ValidationPipe)
  async create(
    @Body() createSupplierDto: CreateSupplierDto,
    @Res() res: Response,
  ) {
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
    @Body() updateSupplierDto: UpdateSupplierDto,
  ) {
    return this.supplierService.update(+id, updateSupplierDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.supplierService.remove(+id);
  }
}
