import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import * as mongoose from 'mongoose';

export class BaseModel {
  @ApiProperty()
  @Transform(({ value }: { value: mongoose.Types.ObjectId }) =>
    value.toString(),
  )
  id: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
