import { MigrationInterface, QueryRunner } from 'typeorm';
import { ProductEntity } from '../entities';
import * as fs from 'fs';

const PRODUCT_FILE_PATH = './data/products.json';

export class PopulateDB1708182361020 implements MigrationInterface {
  name = 'PopulateDB1708182361020';

  public async up(queryRunner: QueryRunner): Promise<void> {
    const products = this.loadProducts();

    for (const product of products) {
      console.log(product);
      await queryRunner.manager.insert(ProductEntity, product);
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const products = this.loadProducts();

    for (const product of products) {
      await queryRunner.manager.delete(ProductEntity, { model: product.model });
    }
  }

  private loadProducts() {
    let products = [];
    try {
      const fileContent = fs.readFileSync(PRODUCT_FILE_PATH, 'utf-8');
      products = JSON.parse(fileContent);
    } catch (error) {
      throw Error(`Error reading products file: ${error}`);
    }
    return products;
  }
}
