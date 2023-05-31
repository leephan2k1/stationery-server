import { Module } from '@nestjs/common';
import { BrandService } from '../services/brand.service';
import { BrandController } from '../controllers/brand/brand.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Brand, BrandSchema } from 'src/schemas/Brand.schema';
import { BrandRepository } from 'src/repositories/brand.repository';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Brand.name, schema: BrandSchema }]),
  ],
  controllers: [BrandController],
  providers: [BrandService, BrandRepository],
})
export class BrandModule {}
