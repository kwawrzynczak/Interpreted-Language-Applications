import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Status } from '@prisma/client';

import { PrismaService } from 'src/prisma/prisma.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { EditOrderDto } from './dto/edit-order.dto';

@Injectable()
export class OrderService {
  constructor(private prismaService: PrismaService) {}

  getOrders(userId: number) {
    return this.prismaService.order.findMany({
      where: { userId },
    });
  }

  async getAllOrders() {
    const orders = await this.prismaService.order.findMany();
    return orders.sort((a, b) => a.id - b.id);
  }

  async createOrder(
    userId: number,
    { orderStatusId, orderItems }: CreateOrderDto,
  ) {
    const orderStatus = await this.prismaService.orderStatus.findFirst({
      where: { id: orderStatusId },
    });

    if (!orderStatus) {
      throw new NotFoundException('Order status does not exist');
    }

    const productIds = orderItems.map(({ productId }) => productId);

    const products = await this.prismaService.product.findMany({
      where: { id: { in: productIds } },
    });

    if (products.length !== orderItems.length) {
      throw new BadRequestException('One or more products do not exist');
    }

    const orderItemsWithPrices = orderItems.map((orderItem) => {
      const product = products.find(({ id }) => id === orderItem.productId);

      if (!product) {
        throw new NotFoundException('Product not found');
      }

      return {
        ...orderItem,
        price: product.price,
      };
    });

    const order = await this.prismaService.order.create({
      data: {
        userId,
        orderStatusId,
        orderItems: {
          create: orderItemsWithPrices,
        },
      },
    });

    return order;
  }

  async editOrderStatus(orderId: number, { orderStatusId }: EditOrderDto) {
    const order = await this.prismaService.order.findFirst({
      where: { id: orderId },
    });

    if (!order) {
      throw new NotFoundException('Order not found');
    }

    const orderStatus = await this.prismaService.orderStatus.findFirst({
      where: { id: order.orderStatusId },
    });

    if (!orderStatus) {
      throw new NotFoundException('Order status not found');
    }

    if (orderStatus.status === Status.CANCELED) {
      throw new ForbiddenException(
        'The status of a canceled order cannot be changed',
      );
    }

    const orders = await this.prismaService.order.update({
      where: { id: orderId },
      data: { orderStatusId },
    });

    return orders;
  }

  async getOrdersByStatus(orderStatusId: number) {
    const status = await this.prismaService.orderStatus.findFirst({
      where: { id: orderStatusId },
    });

    if (!status) {
      throw new NotFoundException('Status not found');
    }

    const orders = await this.prismaService.order.findMany({
      where: { orderStatusId },
    });

    return orders;
  }
}
