import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ProductsModule } from './products/products.module';
import { TableModule } from './table/table.module';
import { CategoryModule } from './category/category.module';

@Module({
  imports: [UsersModule, ProductsModule, TableModule, CategoryModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
