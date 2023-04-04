import { IsInt, IsNotEmpty } from 'class-validator';

export class EditOrderDto {
  @IsInt()
  @IsNotEmpty()
  orderStatusId: number;
}
