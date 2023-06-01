import { Module } from '@nestjs/common';
import { WarehouseService } from '../services/warehouse.service';
import { WarehouseController } from '../controllers';
import { MongooseModule } from '@nestjs/mongoose';
import { Warehouse, WarehouseSchema } from 'src/schemas/Warehouse.schema';
import { WarehouseRepository } from 'src/repositories/warehouse.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Warehouse.name, schema: WarehouseSchema },
    ]),
  ],
  controllers: [WarehouseController],
  providers: [WarehouseService, WarehouseRepository],
})
export class WarehouseModule {}
