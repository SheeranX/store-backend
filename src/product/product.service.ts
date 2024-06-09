import { Prisma } from "@prisma/client";
import { PrismaService } from "../prisma/prisma.service";
import { Injectable } from "@nestjs/common";
import { CreateProductDto } from "./dto/createProduct";

@Injectable()
export class ProductService {
  constructor (private prisma: PrismaService) {}

  async create (data: Prisma.ProductCreateInput) {
    return await this.prisma.product.create({ data })
  }
}