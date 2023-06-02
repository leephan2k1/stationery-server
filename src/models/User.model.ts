import { ApiProperty } from '@nestjs/swagger';
import { Gender } from 'src/common/enums/gender.enum';
import { Permission } from 'src/common/enums/permission.enum';
import { Role } from 'src/common/enums/role.enum';
import { User } from 'src/schemas/User.schema';
import { ContactModel } from './Contact.model';
import { BaseModel } from './shared/Base.model';

export class UserModel extends BaseModel {
  @ApiProperty()
  email: string;

  @ApiProperty()
  fullName: string;

  @ApiProperty()
  contacts: ContactModel[];

  @ApiProperty()
  dateOfBirth: Date;

  @ApiProperty()
  gender: Gender;

  @ApiProperty()
  roles: Role[];

  @ApiProperty()
  permissions: Permission[];

  static fromEntity(user: User) {
    if (!user) return null;

    const model = new UserModel();

    model.id = user._id.toString();
    model.email = user.email;

    if (user.first_name && user.last_name) {
      model.fullName = user.first_name + ' ' + user.last_name;
    }

    if (user.contacts) {
      model.contacts = user.contacts.map((e) => ContactModel.fromEntity(e));
    }

    model.dateOfBirth = user.dateOfBirth;
    model.gender = user.gender;
    model.roles = user.roles;
    model.permissions = user.permissions;

    return model;
  }
}
