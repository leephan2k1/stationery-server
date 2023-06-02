import { Injectable, NotFoundException } from '@nestjs/common';
import { PostUserRequest } from 'src/controllers/user/post-user.request';
import { UserModel } from 'src/models/User.model';
import { UserRepository } from 'src/repositories/user.repository';
import { decodePassword } from 'src/utils/bcrypt';

@Injectable()
export class UserService {
  constructor(private readonly userRepo: UserRepository) {}

  async comparePassword(user: PostUserRequest) {
    const entity = user.createEntity({ withoutId: false });
    const userInfo = await this.userRepo.findUserByEmail(entity);

    if (!userInfo) {
      throw new NotFoundException('User not found');
    }

    const status = await decodePassword({
      reqPassword: user.password,
      currentPassword: userInfo.password,
    });

    let model;
    if (userInfo) {
      model = UserModel.fromEntity(userInfo);
    }

    return {
      status,
      user: model,
    };
  }

  async validateUseReq({ email, password }: PostUserRequest) {
    const errs = [];

    if (!email) errs.push('email is missing');
    if (!password) errs.push('password is missing');

    return errs.length > 0 ? errs : null;
  }

  async create(user: PostUserRequest): Promise<UserModel> {
    const entity = user.createEntity({ withoutId: false });
    const model = await this.userRepo.save(entity);

    return UserModel.fromEntity(model);
  }
}
