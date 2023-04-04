import {
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  description?: string;

  @IsNumber()
  @Min(0)
  @IsNotEmpty()
  price: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  @IsNotEmpty()
  weight?: number;

  @IsInt()
  @IsNotEmpty()
  categoryId: number;
}
