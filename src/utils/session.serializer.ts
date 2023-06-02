import { Injectable } from '@nestjs/common';
import { PassportSerializer } from '@nestjs/passport';
import { UserModel } from 'src/models/User.model';
import { UserRepository } from 'src/repositories/user.repository';
import { User } from 'src/schemas/User.schema';

@Injectable()
export class SessionSerializer extends PassportSerializer {
  constructor(private readonly userRepo: UserRepository) {
    super();
  }

  serializeUser(user: User, done: (err, user: User) => void) {
    done(null, user);
  }

  async deserializeUser(user: User, done: (err, user: User) => void) {
    const userDb = await this.userRepo.findUserByEmail(user);

    let userModel;
    if (userDb) {
      userModel = UserModel.fromEntity(userDb);
    }

    //pass to req.user
    return userModel ? done(null, userModel) : done(null, null);
  }
}
