import {
  Controller,
  Get,
  Post,
  Put,
  Param,
  Delete,
  Body,
  HttpStatus,
  Res,
} from '@nestjs/common';
import { WarehouseService } from '../../services/warehouse.service';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { PostWarehouseRequest } from './post-warehouse.request';
import { ApiMessage, BaseResponse } from 'src/common/response';
import { Response } from 'express';
import { PostWarehouseResponse } from './post-warehouse.response';
import { GetWarehouseResponse } from './get-warehouse.response';

@ApiTags('warehouses')
@Controller('warehouses')
export class WarehouseController {
  constructor(private readonly warehouseService: WarehouseService) {}

  @Post()
  @ApiResponse({ status: HttpStatus.CREATED, type: PostWarehouseResponse })
  async create(@Body() reqBody: PostWarehouseRequest, @Res() res: Response) {
    const errs: ApiMessage[] = await this.warehouseService.validatePostRequest(
      reqBody,
    );

    if (errs && errs.length > 0) {
      return res
        .status(HttpStatus.BAD_REQUEST)
        .send(new BaseResponse(false, errs));
    }

    const model = await this.warehouseService.create(reqBody);

    return res.status(HttpStatus.CREATED).send(PostWarehouseResponse.of(model));
  }

  @Get()
  findAll() {
    return this.warehouseService.findAll();
  }

  @Get(':id')
  @ApiResponse({ status: HttpStatus.OK, type: GetWarehouseResponse })
  async findOne(@Param('id') id: string, @Res() res: Response) {
    const model = await this.warehouseService.findOne(id);

    return res.status(HttpStatus.OK).send(GetWarehouseResponse.of(model));
  }

  @Put(':id')
  @ApiResponse({ status: HttpStatus.OK, type: GetWarehouseResponse })
  async update(
    @Param('id') id: string,
    @Body() reqBody: PostWarehouseRequest,
    @Res() res: Response,
  ) {
    const model = await this.warehouseService.update(id, reqBody);

    return res.status(HttpStatus.OK).send(GetWarehouseResponse.of(model));
  }

  @Delete(':id')
  @ApiResponse({ status: HttpStatus.OK, type: GetWarehouseResponse })
  async remove(@Param('id') id: string, @Res() res: Response) {
    const model = await this.warehouseService.remove(id);

    return res.status(HttpStatus.OK).send(GetWarehouseResponse.of(model));
  }
}
