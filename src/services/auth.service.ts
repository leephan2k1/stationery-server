import { Injectable } from '@nestjs/common';
import { UserService } from './user.service';
import { PostUserRequest } from 'src/controllers/user/post-user.request';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  async validateUser(reqUser: PostUserRequest) {
    const { status, user } = await this.userService.comparePassword(reqUser);
    return { status, user };
  }
}
