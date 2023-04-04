import { Controller, Get } from '@nestjs/common';

import { OrderStatusService } from './order-status.service';

@Controller('status')
export class OrderStatusController {
  constructor(private orderStatusService: OrderStatusService) {}

  @Get()
  getStatuses() {
    return this.orderStatusService.getStatuses();
  }
}
