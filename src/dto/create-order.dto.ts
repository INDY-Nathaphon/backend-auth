import { IsString, IsNotEmpty, IsArray, IsEmail } from 'class-validator';
import { CreateOrderItemDto } from './create-order-item.dto';

export class CreateOrderDto {
  @IsString()
  @IsNotEmpty()
  customerName: string;

  @IsEmail()
  customerEmail: string;

  @IsArray()
  @IsNotEmpty()
  items: CreateOrderItemDto[];
}
