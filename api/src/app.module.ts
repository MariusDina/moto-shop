import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { ProductsModule } from './products/products.module';
import * as cors from 'cors';
import { TypeOrmModule } from '@nestjs/typeorm';
import { getConnectionOptions } from 'libs/db';
import { MetricsController } from './metrics/metrics.controller';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      ...getConnectionOptions(),
    }),
    ProductsModule,
  ],
  controllers: [MetricsController],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(cors()) // Use the default options, you can customize if needed
      .forRoutes('*'); // Apply CORS to all routes, you can specify routes if needed
  }
}
