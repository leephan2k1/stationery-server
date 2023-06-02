import { BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from 'src/schemas/User.schema';

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

  async save(reqBody: User): Promise<User> {
    return this.model.create(reqBody);
  }
}
