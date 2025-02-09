import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './product.entity';
import { Cache } from 'cache-manager';
import { CreateProductDto } from 'src/dto/create-product.dto';
import { UpdateProductDto } from 'src/dto/update-product.dto';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import * as createCsvWriter from 'csv-writer';
import { Response as ExpressResponse } from 'express';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productsRepository: Repository<Product>,

    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  async findAll(): Promise<Product[]> {
    const cacheKey = 'all_products';
    const cachedProducts = await this.cacheManager.get<Product[]>(cacheKey);

    if (cachedProducts) {
      return cachedProducts;
    }

    const products = await this.productsRepository.find();
    await this.cacheManager.set(cacheKey, products);

    return products;
  }

  async create(createProductDto: CreateProductDto): Promise<Product> {
    const product = this.productsRepository.create(createProductDto);
    return this.productsRepository.save(product);
  }

  async update(
    id: number,
    updateProductDto: UpdateProductDto,
  ): Promise<Product> {
    const product = await this.productsRepository.findOneBy({ id });

    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }

    Object.assign(product, updateProductDto);
    return this.productsRepository.save(product);
  }

  async remove(id: number): Promise<void> {
    await this.productsRepository.delete(id);
    await this.cacheManager.del('all_products');
  }

  async findOne(id: number): Promise<Product | null> {
    return await this.productsRepository.findOneBy({ id });
  }

  async exportToCSV(response: ExpressResponse): Promise<void> {
    const products = await this.findAll();

    // สร้าง csv writer
    const csvWriter = createCsvWriter.createObjectCsvWriter({
      path: 'products.csv',
      header: [
        { id: 'id', title: 'ID' },
        { id: 'name', title: 'Name' },
        { id: 'description', title: 'Description' },
        { id: 'price', title: 'Price' },
        { id: 'quantity', title: 'Quantity' },
      ],
    });

    // เขียนข้อมูลสินค้าลงในไฟล์ CSV
    await csvWriter.writeRecords(products);

    // ตั้งค่าให้ Response เป็นการดาวน์โหลดไฟล์ CSV
    response.setHeader('Content-Type', 'text/csv');
    response.setHeader(
      'Content-Disposition',
      'attachment; filename=products.csv',
    );
    response.sendFile('products.csv', { root: './' });
  }
}
