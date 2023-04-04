import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { PrismaService } from 'src/prisma/prisma.service';
import { CreateProductDto } from './dto/create-product.dto';
import { EditProductDto } from './dto/edit-product.dto';

@Injectable()
export class ProductService {
  constructor(private prismaService: PrismaService) {}

  getProducts() {
    return this.prismaService.product.findMany();
  }

  async getProductById(productId: number) {
    const product = await this.prismaService.product.findFirst({
      where: { id: productId },
    });

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    return product;
  }

  async createProduct(createProductDto: CreateProductDto) {
    const category = await this.prismaService.category.findFirst({
      where: { id: createProductDto.categoryId },
    });

    if (!category) {
      throw new NotFoundException(`Category does not exist`);
    }

    const product = await this.prismaService.product.create({
      data: { ...createProductDto },
    });

    return product;
  }

  async editProductById(productId: number, editProductDto: EditProductDto) {
    const product = await this.prismaService.product.findUnique({
      where: { id: productId },
    });

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    if (Object.keys(editProductDto).length === 0) {
      throw new BadRequestException('Body cannot be empty');
    }

    return this.prismaService.product.update({
      where: { id: productId },
      data: { ...editProductDto },
    });
  }
}
