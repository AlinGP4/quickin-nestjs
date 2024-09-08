import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { Product } from 'src/core/db/product.entity';
import { Category } from 'src/core/db/category.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Category, Product])],
  providers: [ProductsService],
  controllers: [ProductsController]
})
export class ProductsModule { }
