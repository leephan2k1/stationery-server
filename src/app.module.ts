import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SupplierModule } from './modules/supplier.module';
import { BrandModule } from './modules/brand.module';
import { CategoryModule } from './modules/category.module';
import { ProductModule } from './modules/product.module';
import { WarehouseModule } from './modules/warehouse.module';
import { AuthModule } from './modules/auth.module';
import { UserModule } from './modules/user.module';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    ConfigModule.forRoot({ cache: true }),

    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => ({
        uri: config.get<string>('MONGODB_URI'),
      }),
    }),

    PassportModule.register({
      session: true,
    }),

    SupplierModule,
    BrandModule,
    CategoryModule,
    ProductModule,
    WarehouseModule,
    AuthModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
