import { Controller, Get, Post, Body, Param, HttpStatus } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductDto } from './dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ProductInput } from './dto';
import { MetricsService } from 'src/metrics/metrics.service';

@ApiTags('Products')
@Controller('products')
export class ProductsController {
  constructor(
    private readonly productsService: ProductsService,
    private readonly metricsService: MetricsService,
  ) { }

  @ApiOperation({
    summary: 'Get all products',
  })
  @ApiResponse({
    type: ProductDto,
    status: HttpStatus.OK,
  })
  @Get()
  getAllProducts() {
    return this.productsService.getAllProducts();
  }

  @ApiOperation({
    summary: 'Get product by id',
  })
  @ApiResponse({
    type: ProductDto,
    status: HttpStatus.OK,
  })
  @Get(':id')
  getProductById(@Param('id') id: string) {
    this.metricsService.incrementHttpRequestCounter('GET', `/${id}`);
    return this.productsService.getProductById(Number(id));
  }

  @ApiOperation({
    summary: 'Add new product',
  })
  @ApiResponse({
    description: 'Product added successfully',
    status: HttpStatus.OK,
  })
  @Post('add')
  createProduct(@Body() productDto: ProductInput) {
    return this.productsService.createProduct(productDto);
  }
}
