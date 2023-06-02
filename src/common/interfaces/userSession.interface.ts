import { Request } from 'express';
import { UserModel } from 'src/models/User.model';

export interface UserSessionRequest extends Request {
  user: UserModel;
}
