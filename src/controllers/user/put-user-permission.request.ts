import { ApiProperty } from '@nestjs/swagger';
import { Permission } from 'src/common/enums/permission.enum';
import { Role } from 'src/common/enums/role.enum';
import { User } from 'src/schemas/User.schema';

export class PutUserPermissionRequest {
  @ApiProperty()
  roles?: Role[];

  @ApiProperty()
  permissions: Permission[];

  public createEntity(): User {
    const entity = new User();
    entity.permissions = this.permissions;
    if (this.roles) entity.roles = this.roles;
    return entity;
  }
}
