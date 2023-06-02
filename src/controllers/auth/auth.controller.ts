import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { UserSessionRequest } from 'src/common/interfaces/userSession.interface';
import { ApiMessage, BaseResponse } from 'src/common/response';
import { AuthenticatedGuard, LocalAuthGuard } from 'src/guards/localAuth.guard';
import { UserService } from 'src/services/user.service';
import { GetUserResponse } from '../user/get-user.response';
import { PostUserRequest } from '../user/post-user.request';
import { PostUserResponse } from '../user/post-user.response';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly userService: UserService) {}

  @Get('status')
  @UseGuards(AuthenticatedGuard)
  @ApiResponse({ status: HttpStatus.OK, type: GetUserResponse })
  async userStatus(@Req() req: UserSessionRequest, @Res() res: Response) {
    return res.status(HttpStatus.OK).send(GetUserResponse.of(req.user));
  }

  @Post('sign-in')
  @UseGuards(LocalAuthGuard)
  @ApiResponse({ status: HttpStatus.OK, type: GetUserResponse })
  async signIn(
    @Req() req: UserSessionRequest,
    @Res() res: Response,
    @Body() reqBody: PostUserRequest,
  ) {
    return res.status(HttpStatus.OK).send(GetUserResponse.of(req.user));
  }

  @Post('sign-up')
  @ApiResponse({ status: HttpStatus.CREATED, type: PostUserResponse })
  async signUp(@Body() reqBody: PostUserRequest, @Res() res: Response) {
    const errs: ApiMessage[] = await this.userService.validateUseReq(reqBody);

    if (errs && errs.length > 0) {
      return res
        .status(HttpStatus.BAD_REQUEST)
        .send(new BaseResponse(false, errs));
    }

    const model = await this.userService.create(reqBody);

    return res.status(HttpStatus.CREATED).send(PostUserResponse.of(model));
  }
}
