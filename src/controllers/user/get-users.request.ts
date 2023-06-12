import { ApiProperty } from '@nestjs/swagger';
import { Permission } from 'src/common/enums/permission.enum';
import { Role } from 'src/common/enums/role.enum';
import { BaseQuery } from 'src/common/request/base-query.request';

export class GetUsersRequestQuery extends BaseQuery {
  @ApiProperty()
  role: Role;

  @ApiProperty()
  permission?: Permission;
}
