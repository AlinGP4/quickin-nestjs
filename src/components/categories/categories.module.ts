import { Module } from '@nestjs/common';
import { CategoriesController } from './categories.controller';
import { CategoriesService } from './categories.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from 'src/core/db/category.entity';
import { Product } from 'src/core/db/product.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Category,Product])],
  controllers: [CategoriesController],
  providers: [CategoriesService]
})
export class CategoriesModule {

}
