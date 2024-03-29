import {
  BadRequestException,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from 'src/schemas/User.schema';
import mongoose from 'mongoose';
import { GetUsersRequestQuery } from 'src/controllers/user/get-users.request';

export class UserRepository {
  constructor(
    @InjectModel(User.name) private readonly model: Model<UserDocument>,
  ) {}

  async findUserByEmail({ email }: User) {
    let user;
    try {
      user = await this.model.findOne({ email }).exec();
    } catch (error) {
      throw new BadRequestException(error);
    }

    if (!user) throw new NotFoundException('user not found');

    return user;
  }

  async updateUserPermissions(
    id: string,
    { permissions, roles }: User,
  ): Promise<User> {
    let user;
    try {
      user = await this.model.findByIdAndUpdate(
        new mongoose.Types.ObjectId(id),
        {
          permissions: permissions,
          roles: roles,
        },
      );
    } catch (error) {
      throw new BadRequestException(error);
    }

    if (!user) throw new NotFoundException('user not found');

    return user;
  }

  async save(reqBody: User): Promise<User> {
    return this.model.create(reqBody);
  }

  async findAll({
    role,
    permission,
    page,
    limit,
  }: GetUsersRequestQuery): Promise<{ users: User[]; count: number }> {
    let users;
    let count;

    const conditions = new Map();
    if (role) conditions.set('roles', { $in: [role] });
    if (permission) conditions.set('permissions', { $in: [permission] });

    try {
      [users, count] = await Promise.all([
        await this.model
          .find(Object.fromEntries(conditions))
          .limit(limit)
          .skip(limit * (page - 1)),

        this.model.count(Object.fromEntries(conditions)),
      ]);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }

    if (!users) {
      throw new NotFoundException('users not found');
    }

    return { users, count };
  }

  async deleteUserById(id: string): Promise<User> {
    let user;
    try {
      user = await this.model
        .findByIdAndDelete(new mongoose.Types.ObjectId(id))
        .exec();
    } catch (error) {
      throw new BadRequestException(error);
    }

    if (!user) throw new NotFoundException('user not found');

    return user;
  }
}
