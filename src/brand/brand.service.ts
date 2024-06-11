import { Prisma } from "@prisma/client";
import { PrismaService } from "../prisma/prisma.service";
import { Injectable } from "@nestjs/common";

@Injectable()
export class BrandService {
  constructor (private prisma: PrismaService) {}

  async create (data: Prisma.BrandCreateInput) {
    return await this.prisma.brand.create({ data })
  }

  async page(data: { limit: number, page: number }) {
    const [list, pagination] = await this.prisma.pg().brand.paginate().withPages({ includePageCount: true, ...data })
    return {
      list,
      pagination,
    }
  }

  async findAll(data: Prisma.BrandFindManyArgs) {
    return await this.prisma.brand.findMany(data)
  }

  async remove(where: Prisma.BrandWhereUniqueInput) {
    return await this.prisma.brand.delete({ where }).then(() => {
      return true
    })
  }
}