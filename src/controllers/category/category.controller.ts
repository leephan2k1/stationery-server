import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { Roles } from 'src/common/decorators/roles.decorator';
import { Permission, Role } from 'src/common/enums';
import { ApiMessage, BaseResponse } from 'src/common/response';
import { CategoryService } from '../../services/category.service';
import {
  GetCategoriesResponse,
  GetCategoryResponse,
} from './get-category.response';
import { PostCategoryRequest } from './post-category.request';
import { PostCategoryResponse } from './post-category.response';
import { PutCategoryRequest } from './put-category.request';
import { RolesGuard } from 'src/guards/role.guard';
import { Permissions } from 'src/common/decorators/permissions.decorator';
import { PermissionsGuard } from 'src/guards/permission.guard';
import { UserSessionRequest } from 'src/common/interfaces/userSession.interface';
import { GetCategoriesQuery } from './get-category.query';

@ApiTags('categories')
@Controller('categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  @ApiResponse({ status: HttpStatus.OK, type: GetCategoriesResponse })
  async getAllCategory(
    @Query() queries: GetCategoriesQuery,
    @Res() res: Response,
  ) {
    const { count, suppliers } = await this.categoryService.findMany(queries);

    return res
      .status(HttpStatus.OK)
      .send(GetCategoriesResponse.of(suppliers, count));
  }

  @Post()
  @Roles(Role.ADMIN, Role.EMPLOYEE)
  @UseGuards(RolesGuard)
  @Permissions(Permission.CREATE_CATEGORY)
  @UseGuards(PermissionsGuard)
  @ApiResponse({ status: HttpStatus.CREATED, type: PostCategoryResponse })
  async create(
    @Body() reqBody: PostCategoryRequest,
    @Res() res: Response,
    @Req() req: UserSessionRequest,
  ) {
    const errs: ApiMessage[] = await this.categoryService.validateBody({
      name: reqBody.name,
      parentCategory: reqBody?.parentCategory,
    });

    if (errs && errs.length > 0) {
      return res
        .status(HttpStatus.BAD_REQUEST)
        .send(new BaseResponse(false, errs));
    }

    const model = await this.categoryService.create(reqBody, req.user.id);

    return res.status(HttpStatus.CREATED).send(PostCategoryResponse.of(model));
  }

  @Get(':slug')
  @ApiResponse({ status: HttpStatus.OK, type: GetCategoryResponse })
  async findOne(@Param('slug') slug: string, @Res() res: Response) {
    const model = await this.categoryService.findOne(slug);

    return res.status(HttpStatus.OK).send(PostCategoryResponse.of(model));
  }

  @Put(':slug')
  @Roles(Role.ADMIN, Role.EMPLOYEE)
  @UseGuards(RolesGuard)
  @Permissions(Permission.UPDATE_CATEGORY)
  @UseGuards(PermissionsGuard)
  @ApiResponse({ status: HttpStatus.OK, type: GetCategoryResponse })
  async update(
    @Param('slug') slug: string,
    @Body() reqBody: PutCategoryRequest,
    @Res() res: Response,
    @Req() req: UserSessionRequest,
  ) {
    const errs: ApiMessage[] = await this.categoryService.validateBody({
      name: reqBody.name,
      parentCategory: reqBody?.parentCategory,
    });

    if (errs && errs.length > 0) {
      return res
        .status(HttpStatus.BAD_REQUEST)
        .send(new BaseResponse(false, errs));
    }

    const model = await this.categoryService.update(slug, reqBody, req.user.id);

    return res.status(HttpStatus.OK).send(GetCategoryResponse.of(model));
  }

  @Delete(':slug')
  @Roles(Role.ADMIN, Role.EMPLOYEE)
  @UseGuards(RolesGuard)
  @Permissions(Permission.DELETE_CATEGORY)
  @UseGuards(PermissionsGuard)
  @ApiResponse({ status: HttpStatus.OK, type: GetCategoryResponse })
  async remove(@Param('slug') slug: string, @Res() res: Response) {
    const model = await this.categoryService.delete(slug);

    return res.status(HttpStatus.OK).send(GetCategoryResponse.of(model));
  }
}
