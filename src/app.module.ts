import { Module } from '@nestjs/common';
import { CategoriesModule } from './components/categories/categories.module';
import { ProductsModule } from './components/products/products.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    CategoriesModule, 
    ProductsModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'quickin',
      autoLoadEntities: true,
      synchronize: true,
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
