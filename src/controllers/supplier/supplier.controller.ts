import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Res,
} from '@nestjs/common';
import {
  Query,
  Req,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common/decorators';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { Permissions } from 'src/common/decorators/permissions.decorator';
import { Roles } from 'src/common/decorators/roles.decorator';
import { Permission, Role } from 'src/common/enums';
import { UserSessionRequest } from 'src/common/interfaces/userSession.interface';
import { ApiMessage, BaseResponse } from 'src/common/response';
import { PermissionsGuard } from 'src/guards/permission.guard';
import { RolesGuard } from 'src/guards/role.guard';
import { SupplierService } from 'src/services/supplier.service';
import { GetSupplierQuery } from './get-supplier.query';
import {
  GetSupplierResponse,
  GetSuppliersResponse,
} from './get-supplier.response';
import { PatchSupplierRequest } from './patch-supplier.request';
import { PostSupplierRequest } from './post-supplier.request';
import { PostSupplierResponse } from './post-supplier.response';

@ApiTags('suppliers')
@Controller('suppliers')
@UseInterceptors(ClassSerializerInterceptor)
export class SupplierController {
  constructor(private readonly supplierService: SupplierService) {}

  @Get()
  @ApiResponse({ status: HttpStatus.OK, type: GetSuppliersResponse })
  async getAllCategory(
    @Query() queries: GetSupplierQuery,
    @Res() res: Response,
  ) {
    const { count, suppliers } = await this.supplierService.findMany(queries);

    return res
      .status(HttpStatus.OK)
      .send(GetSuppliersResponse.of(suppliers, count));
  }

  /**
   * Add new supplier
   * @param res
   * @param requestBody
   * @returns
   */
  @Post()
  @Roles(Role.ADMIN, Role.EMPLOYEE)
  @UseGuards(RolesGuard)
  @Permissions(Permission.CREATE_SUPPLIER)
  @UseGuards(PermissionsGuard)
  @ApiOperation({ operationId: 'addSupplier' })
  @ApiResponse({ status: HttpStatus.CREATED, type: PostSupplierResponse })
  public async create(
    @Res() res: Response,
    @Body() requestBody: PostSupplierRequest,
    @Req() req: UserSessionRequest,
  ) {
    const errs: ApiMessage[] = await this.supplierService.validateBodySupplier(
      requestBody,
    );
    if (errs && errs.length > 0) {
      return res
        .status(HttpStatus.BAD_REQUEST)
        .send(new BaseResponse(false, errs));
    }
    const model = await this.supplierService.create(requestBody, req.user.id);
    return res.status(HttpStatus.CREATED).send(PostSupplierResponse.of(model));
  }

  @Get(':id')
  @ApiResponse({ status: HttpStatus.OK, type: GetSupplierResponse })
  async findOne(@Param('id') id: string, @Res() res: Response) {
    const model = await this.supplierService.findOne(id);

    return res.status(HttpStatus.OK).send(GetSupplierResponse.of(model));
  }

  @Put(':id')
  @Roles(Role.ADMIN, Role.EMPLOYEE)
  @UseGuards(RolesGuard)
  @Permissions(Permission.UPDATE_SUPPLIER)
  @UseGuards(PermissionsGuard)
  @ApiResponse({ status: HttpStatus.OK, type: GetSupplierResponse })
  async update(
    @Param('id') id: string,
    @Body() updateSupplierDto: PatchSupplierRequest,
    @Res() res: Response,
    @Req() req: UserSessionRequest,
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

    const model = await this.supplierService.update(
      id,
      updateSupplierDto,
      req.user.id,
    );

    return res.status(HttpStatus.OK).send(GetSupplierResponse.of(model));
  }

  @Delete(':id')
  @Roles(Role.ADMIN, Role.EMPLOYEE)
  @UseGuards(RolesGuard)
  @Permissions(Permission.DELETE_SUPPLIER)
  @UseGuards(PermissionsGuard)
  @ApiResponse({ status: HttpStatus.OK, type: GetSupplierResponse })
  async remove(@Param('id') id: string, @Res() res: Response) {
    const model = await this.supplierService.remove(id);

    return res.status(HttpStatus.OK).send(GetSupplierResponse.of(model));
  }
}
