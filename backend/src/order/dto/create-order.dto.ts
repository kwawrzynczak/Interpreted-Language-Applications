import { Type } from 'class-transformer';
import {
  ArrayNotEmpty,
  IsInt,
  IsNotEmpty,
  ValidateNested,
} from 'class-validator';

import { CreateOrderItemDto } from './create-order-item.dto';

export class CreateOrderDto {
  @IsInt()
  @IsNotEmpty()
  orderStatusId: number;

  @ArrayNotEmpty()
  @ValidateNested()
  @Type(() => CreateOrderItemDto)
  orderItems: CreateOrderItemDto[];
}
