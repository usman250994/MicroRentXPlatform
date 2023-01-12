import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { ElasticModule } from 'src/elastic/elastic.module';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import Product from 'src/database/product.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [DatabaseModule, ElasticModule, TypeOrmModule.forFeature([Product])],
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule {}
