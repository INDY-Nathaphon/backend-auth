import { Controller, Post, Body, Get, UseGuards } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { Order } from './order.entity';
import { CreateOrderDto } from 'src/dto/create-order.dto';
import { Roles } from 'src/auth/roles.decorator';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @UseGuards(RolesGuard, JwtAuthGuard)
  @Roles('admin')
  @Post()
  async create(@Body() createOrderDto: CreateOrderDto): Promise<Order> {
    return this.ordersService.create(createOrderDto);
  }

  @UseGuards(RolesGuard, JwtAuthGuard)
  @Roles('admin', 'customer')
  @Get()
  async findAll(): Promise<Order[]> {
    return this.ordersService.findAll();
  }
}
