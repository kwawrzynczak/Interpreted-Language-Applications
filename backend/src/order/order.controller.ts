import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';

import { GetUser } from 'src/auth/decorator';
import { JwtGuard } from 'src/auth/guard';
import { CreateOrderDto } from './dto/create-order.dto';
import { EditOrderDto } from './dto/edit-order.dto';
import { OrderService } from './order.service';

@UseGuards(JwtGuard)
@Controller('orders')
export class OrderController {
  constructor(private orderService: OrderService) {}

  @Get()
  getOrders(@GetUser('id') userId: number) {
    return this.orderService.getOrders(userId);
  }

  @Get('all')
  getAllOrders() {
    return this.orderService.getAllOrders();
  }

  @Post()
  createOrder(
    @GetUser('id') userId: number,
    @Body() createOrderDto: CreateOrderDto,
  ) {
    return this.orderService.createOrder(userId, createOrderDto);
  }

  @Patch(':id')
  editOrderStatus(
    @Param('id', ParseIntPipe) orderId: number,
    @Body() editOrderDto: EditOrderDto,
  ) {
    return this.orderService.editOrderStatus(orderId, editOrderDto);
  }

  @Get('status/:id')
  getOrdersByStatus(@Param('id', ParseIntPipe) orderStatusId: number) {
    return this.orderService.getOrdersByStatus(orderStatusId);
  }
}
