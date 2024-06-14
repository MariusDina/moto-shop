import { Injectable } from '@nestjs/common';
import { Counter } from 'prom-client';

@Injectable()
export class MetricsService {
  httpRequestCounter: Counter;
  productsCounter: Counter;

  constructor() {
    this.httpRequestCounter = new Counter({
      name: 'http_requests_total_by_id',
      help: 'Total number of HTTP requests',
      labelNames: ['method', 'path'],
    });

    this.productsCounter = new Counter({
      name: 'most_wanted_products',
      help: 'Total number of requests for a specific product',
      labelNames: ['brand', 'model'],
    });
  }

  incrementHttpRequestCounter(method: string, path: string) {
    this.httpRequestCounter.labels(method, path).inc();
  }

  incrementProductsCounter(brand: string, model: string) {
    this.productsCounter.labels(brand, model).inc();
  }
}
