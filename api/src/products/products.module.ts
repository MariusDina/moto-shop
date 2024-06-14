import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import {
  DatabaseModule,
  ProductEntity,
  ProductEntityRepository,
} from 'libs/db';
import { MetricsService } from 'src/metrics/metrics.service';

@Module({
  imports: [
    DatabaseModule.forFeature([ProductEntity], [ProductEntityRepository]),
  ],
  controllers: [ProductsController],
  providers: [ProductsService, MetricsService],
})
export class ProductsModule {}
