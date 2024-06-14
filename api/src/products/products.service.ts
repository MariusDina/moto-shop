import { BadRequestException, Injectable } from '@nestjs/common';
import { ProductEntityRepository } from 'libs/db';
import { ProductInput } from './dto';
import { MetricsService } from 'src/metrics/metrics.service';

@Injectable()
export class ProductsService {
  constructor(private readonly productRepository: ProductEntityRepository,
    private readonly metricsService: MetricsService
  ) { }

  async getAllProducts() {
    return await this.productRepository.find();
  }

  async getProductById(id: number) {
    const product = await this.productRepository.findByID(id);
    if (!product) {
      throw new BadRequestException(`Product with ID ${id} not found`);
    }
    this.metricsService.incrementProductsCounter(product.brand, product.model);
    return product;
  }

  async createProduct(product: ProductInput) {
    return this.productRepository.insert(product);
  }
}
