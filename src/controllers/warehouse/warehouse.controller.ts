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
  UseGuards,
  Req,
} from '@nestjs/common';
import { WarehouseService } from '../../services/warehouse.service';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { PostWarehouseRequest } from './post-warehouse.request';
import { ApiMessage, BaseResponse } from 'src/common/response';
import { Response } from 'express';
import { PostWarehouseResponse } from './post-warehouse.response';
import { GetWarehouseResponse } from './get-warehouse.response';
import { Roles } from 'src/common/decorators/roles.decorator';
import { Permission, Role } from 'src/common/enums';
import { RolesGuard } from 'src/guards/role.guard';
import { Permissions } from 'src/common/decorators/permissions.decorator';
import { PermissionsGuard } from 'src/guards/permission.guard';
import { UserSessionRequest } from 'src/common/interfaces/userSession.interface';

@ApiTags('warehouses')
@Controller('warehouses')
export class WarehouseController {
  constructor(private readonly warehouseService: WarehouseService) {}

  @Post()
  @Roles(Role.ADMIN, Role.EMPLOYEE)
  @UseGuards(RolesGuard)
  @Permissions(Permission.CREATE_WAREHOUSE)
  @UseGuards(PermissionsGuard)
  @ApiResponse({ status: HttpStatus.CREATED, type: PostWarehouseResponse })
  async create(
    @Body() reqBody: PostWarehouseRequest,
    @Res() res: Response,
    @Req() req: UserSessionRequest,
  ) {
    const errs: ApiMessage[] = await this.warehouseService.validatePostRequest(
      reqBody,
    );

    if (errs && errs.length > 0) {
      return res
        .status(HttpStatus.BAD_REQUEST)
        .send(new BaseResponse(false, errs));
    }

    const model = await this.warehouseService.create(reqBody, req.user.id);

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
  @Roles(Role.ADMIN, Role.EMPLOYEE)
  @UseGuards(RolesGuard)
  @Permissions(Permission.UPDATE_WAREHOUSE)
  @UseGuards(PermissionsGuard)
  @ApiResponse({ status: HttpStatus.OK, type: GetWarehouseResponse })
  async update(
    @Param('id') id: string,
    @Body() reqBody: PostWarehouseRequest,
    @Res() res: Response,
    @Req() req: UserSessionRequest,
  ) {
    const model = await this.warehouseService.update(id, reqBody, req.user.id);

    return res.status(HttpStatus.OK).send(GetWarehouseResponse.of(model));
  }

  @Delete(':id')
  @Roles(Role.ADMIN, Role.EMPLOYEE)
  @UseGuards(RolesGuard)
  @Permissions(Permission.CREATE_WAREHOUSE)
  @UseGuards(PermissionsGuard)
  @ApiResponse({ status: HttpStatus.OK, type: GetWarehouseResponse })
  async remove(@Param('id') id: string, @Res() res: Response) {
    const model = await this.warehouseService.remove(id);

    return res.status(HttpStatus.OK).send(GetWarehouseResponse.of(model));
  }
}
