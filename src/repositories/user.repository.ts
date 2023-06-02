import { BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from 'src/schemas/User.schema';
import mongoose from 'mongoose';

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
          $addToSet: {
            permissions: { $each: permissions },
            roles: { $each: roles },
          },
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
}
