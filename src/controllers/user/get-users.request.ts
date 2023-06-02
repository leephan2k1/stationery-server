import { ApiProperty } from '@nestjs/swagger';
import { Permission } from 'src/common/enums/permission.enum';
import { Role } from 'src/common/enums/role.enum';

export class GetUsersRequestQuery {
  @ApiProperty()
  limit?: number;

  @ApiProperty()
  page?: number;

  @ApiProperty()
  role: Role;

  @ApiProperty()
  permission?: Permission;
}
