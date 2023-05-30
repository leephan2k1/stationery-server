import { ApiProperty } from '@nestjs/swagger';
import { UserModel } from '../User.model';
import { BaseModel } from './Base.model';

export class CreatorModel extends BaseModel {
  @ApiProperty()
  createdBy: UserModel;

  @ApiProperty()
  updatedBy: UserModel;
}
