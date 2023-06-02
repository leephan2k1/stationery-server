import {
  Body,
  Controller,
  HttpStatus,
  Param,
  Post,
  Put,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { Role } from 'src/common/enums/role.enum';
import { RolesGuard } from 'src/guards/role.guard';
import { UserService } from 'src/services/user.service';
import { Roles } from 'src/utils/roles.decorator';
import { GetUserResponse } from './get-user.response';
import { PutUserPermissionRequest } from './put-user-permission.request';

@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Put('update-permissions/:id')
  @Roles(Role.ADMIN)
  @UseGuards(RolesGuard)
  @ApiResponse({ status: HttpStatus.OK, type: GetUserResponse })
  async updatePermissions(
    @Param('id') id: string,
    @Body() reqBody: PutUserPermissionRequest,
    @Res() res: Response,
  ) {
    const model = await this.userService.updatePermission(id, reqBody);

    return res.status(HttpStatus.OK).send(GetUserResponse.of(model));
  }
}
