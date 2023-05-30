import { Module } from '@nestjs/common';
import { SupplierService } from 'src/services/supplier.service';
import { SupplierController } from 'src/controllers';
import { SupplierRepository } from 'src/repositories/supplier.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { Supplier, SupplierSchema } from 'src/schemas/Supplier.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Supplier.name, schema: SupplierSchema },
    ]),
  ],
  controllers: [SupplierController],
  providers: [SupplierService, SupplierRepository],
})
export class SupplierModule {}
