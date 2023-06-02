import { ApiProperty } from '@nestjs/swagger';
import { User } from 'src/schemas/User.schema';
import mongoose from 'mongoose';

export class PostUserRequest {
  @ApiProperty()
  email: string;

  @ApiProperty()
  password: string;

  constructor(email: string, password: string) {
    this.email = email;
    this.password = password;
  }

  public createEntity({ withoutId }: { withoutId?: boolean }): User {
    const entity = new User();
    if (!withoutId) {
      entity._id = new mongoose.Types.ObjectId();
    }
    entity.email = this.email;
    entity.password = this.password;
    return entity;
  }
}
