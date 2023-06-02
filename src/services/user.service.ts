import { Injectable, NotFoundException } from '@nestjs/common';
import { Permission } from 'src/common/enums/permission.enum';
import { GetUsersRequestQuery } from 'src/controllers/user/get-users.request';
import { PostUserRequest } from 'src/controllers/user/post-user.request';
import { PutUserPermissionRequest } from 'src/controllers/user/put-user-permission.request';
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

  async updatePermission(
    id: string,
    reqBody: PutUserPermissionRequest,
  ): Promise<UserModel> {
    const entity = reqBody.createEntity();
    const model = await this.userRepo.updateUserPermissions(id, entity);

    return UserModel.fromEntity(model);
  }

  async findUsers(
    queries: GetUsersRequestQuery,
  ): Promise<{ models: UserModel[]; count: number }> {
    if (!queries.limit) queries.limit = 10;
    if (!queries.page) queries.page = 1;

    const { users, count } = await this.userRepo.findAll(queries);

    return {
      models: users.map((e) => UserModel.fromEntity(e)),
      count,
    };
  }
}
