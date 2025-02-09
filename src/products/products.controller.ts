import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  NotFoundException,
  Res,
  UseGuards,
} from '@nestjs/common';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { ProductsService } from './products.service';
import { CreateProductDto } from 'src/dto/create-product.dto';
import { UpdateProductDto } from 'src/dto/update-product.dto';
import { Response } from 'express';
import { Roles } from 'src/auth/roles.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @UseGuards(RolesGuard, JwtAuthGuard)
  @Roles('admin')
  @Post()
  async create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  @UseGuards(RolesGuard, JwtAuthGuard)
  @Roles('admin', 'customer')
  @Get()
  async findAll() {
    return this.productsService.findAll();
  }

  @UseGuards(RolesGuard, JwtAuthGuard)
  @Roles('admin', 'customer')
  @Get(':id')
  async findOne(@Param('id') id: string) {
    const product = await this.productsService.findOne(+id);
    if (!product) {
      throw new NotFoundException(`Product with id ${id} not found`);
    }
    return product;
  }

  @UseGuards(RolesGuard, JwtAuthGuard)
  @Roles('admin')
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    return this.productsService.update(+id, updateProductDto);
  }

  @UseGuards(RolesGuard, JwtAuthGuard)
  @Roles('admin')
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.productsService.remove(+id);
  }

  @UseGuards(RolesGuard, JwtAuthGuard)
  @Roles('admin')
  @Get('export')
  async export(@Res() response: Response): Promise<void> {
    return this.productsService.exportToCSV(response);
  }
}
