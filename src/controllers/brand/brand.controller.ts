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
  UseGuards,
  Req,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { BrandService } from '../../services/brand.service';
import { PostBrandRequest } from './post-brand.request';
import { PostBrandResponse } from './post-brand.response';
import { ApiMessage, BaseResponse } from 'src/common/response';
import { GetBrandResponse } from './get-brand.response';
import { PutBrandRequest } from './put-brand.request';
import { RolesGuard } from 'src/guards/role.guard';
import { Roles } from 'src/common/decorators/roles.decorator';
import { Role } from 'src/common/enums/role.enum';
import { Permissions } from 'src/common/decorators/permissions.decorator';
import { Permission } from 'src/common/enums/permission.enum';
import { PermissionsGuard } from 'src/guards/permission.guard';
import { UserSessionRequest } from 'src/common/interfaces/userSession.interface';

@ApiTags('brands')
@Controller('brands')
export class BrandController {
  constructor(private readonly brandService: BrandService) {}

  @Post()
  @Roles(Role.ADMIN, Role.EMPLOYEE)
  @UseGuards(RolesGuard)
  @Permissions(Permission.CREATE_BRAND)
  @UseGuards(PermissionsGuard)
  @ApiResponse({ status: HttpStatus.CREATED, type: PostBrandResponse })
  async create(
    @Body() reqBody: PostBrandRequest,
    @Res() res: Response,
    @Req() req: UserSessionRequest,
  ) {
    const errs: ApiMessage[] = await this.brandService.validatePostBody(
      reqBody,
    );

    if (errs && errs.length > 0) {
      return res
        .status(HttpStatus.BAD_REQUEST)
        .send(new BaseResponse(false, errs));
    }

    const model = await this.brandService.create(reqBody, req.user.id);

    return res.status(HttpStatus.CREATED).send(PostBrandResponse.of(model));
  }

  @Get(':id')
  @ApiResponse({ status: HttpStatus.OK, type: GetBrandResponse })
  async findOne(@Param('id') id: string, @Res() res: Response) {
    const model = await this.brandService.findOne(id);

    return res.status(HttpStatus.OK).send(GetBrandResponse.of(model));
  }

  @Put(':id')
  @ApiResponse({ status: HttpStatus.OK, type: GetBrandResponse })
  async update(
    @Param('id') id: string,
    @Body() reqBody: PutBrandRequest,
    @Res() res: Response,
  ) {
    const errs: ApiMessage[] = await this.brandService.validateUpdateBody(
      reqBody,
    );

    if (errs && errs.length > 0) {
      return res
        .status(HttpStatus.BAD_REQUEST)
        .send(new BaseResponse(false, errs));
    }

    const model = await this.brandService.update(id, reqBody);

    return res.status(HttpStatus.OK).send(GetBrandResponse.of(model));
  }

  @Delete(':id')
  @ApiResponse({ status: HttpStatus.OK, type: GetBrandResponse })
  async remove(@Param('id') id: string, @Res() res: Response) {
    const model = await this.brandService.remove(id);

    return res.status(HttpStatus.OK).send(GetBrandResponse.of(model));
  }
}
