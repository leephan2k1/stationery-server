import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { Permissions } from 'src/common/decorators/permissions.decorator';
import { Roles } from 'src/common/decorators/roles.decorator';
import { Permission, Role } from 'src/common/enums';
import { ApiMessage, BaseResponse } from 'src/common/response';
import { PermissionsGuard } from 'src/guards/permission.guard';
import { RolesGuard } from 'src/guards/role.guard';
import { GetProductResponse, PostProductRequest, PostProductResponse } from '.';
import { ProductService } from '../../services/product.service';
import { UserSessionRequest } from 'src/common/interfaces/userSession.interface';

@ApiTags('products')
@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  @Roles(Role.ADMIN, Role.EMPLOYEE)
  @UseGuards(RolesGuard)
  @Permissions(Permission.CREATE_PRODUCT)
  @UseGuards(PermissionsGuard)
  @ApiResponse({ status: HttpStatus.CREATED, type: PostProductResponse })
  async create(
    @Body() reqBody: PostProductRequest,
    @Res() res: Response,
    @Req() req: UserSessionRequest,
  ) {
    const errs: ApiMessage[] = await this.productService.validatePostBody(
      reqBody,
    );

    if (errs && errs.length > 0) {
      return res
        .status(HttpStatus.BAD_REQUEST)
        .send(new BaseResponse(false, errs));
    }

    const model = await this.productService.create(reqBody, req.user.id);

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

  @Put(':slug')
  @Roles(Role.ADMIN, Role.EMPLOYEE)
  @UseGuards(RolesGuard)
  @Permissions(Permission.UPDATE_PRODUCT)
  @UseGuards(PermissionsGuard)
  @ApiResponse({ status: HttpStatus.OK, type: GetProductResponse })
  async update(
    @Param('slug') slug: string,
    @Body() reqBody: PostProductRequest,
    @Res() res: Response,
    @Req() req: UserSessionRequest,
  ) {
    const model = await this.productService.update(slug, reqBody, req.user.id);

    return res.status(HttpStatus.OK).send(GetProductResponse.of(model));
  }

  @Delete(':slug')
  @Roles(Role.ADMIN, Role.EMPLOYEE)
  @UseGuards(RolesGuard)
  @Permissions(Permission.DELETE_PRODUCT)
  @UseGuards(PermissionsGuard)
  @ApiResponse({ status: HttpStatus.OK, type: GetProductResponse })
  async remove(@Param('slug') slug: string, @Res() res: Response) {
    const model = await this.productService.remove(slug);

    return res.status(HttpStatus.OK).send(GetProductResponse.of(model));
  }
}
