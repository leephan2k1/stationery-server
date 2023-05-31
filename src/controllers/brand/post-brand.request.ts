import { ApiProperty } from '@nestjs/swagger';
import { Brand } from 'src/schemas/Brand.schema';
import mongoose from 'mongoose';

export class PostBrandRequest {
  @ApiProperty()
  name: string;

  constructor(name: string) {
    this.name = name;
  }

  public createEntity(): Brand {
    const entity = new Brand();
    entity._id = new mongoose.Types.ObjectId();
    entity.name = this.name;
    return entity;
  }
}
