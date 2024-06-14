import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductEntity } from '../entities';
import { InsertResult, Repository } from 'typeorm';

@Injectable()
export class ProductEntityRepository {
  constructor(
    @InjectRepository(ProductEntity)
    private readonly repository: Repository<ProductEntity>,
  ) {}

  insert(product: Partial<ProductEntity>): Promise<InsertResult> {
    return this.repository.insert(product);
  }

  find(): Promise<ProductEntity[]> {
    return this.repository.find({});
  }

  findByID(id: number): Promise<ProductEntity> {
    return this.repository.findOneBy({ id });
  }
}
