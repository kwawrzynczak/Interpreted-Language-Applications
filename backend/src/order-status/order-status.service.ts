import { Injectable } from '@nestjs/common';

import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class OrderStatusService {
  constructor(private prismaService: PrismaService) {}

  getStatuses() {
    return this.prismaService.orderStatus.findMany();
  }
}
