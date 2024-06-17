import { Prisma } from "@prisma/client";
import { PrismaService } from "../prisma/prisma.service";
import { Injectable } from "@nestjs/common";

@Injectable()
export class CatalogService {
  constructor (private prisma: PrismaService) {}

  async create (data: Prisma.CatalogCreateInput) {
    return await this.prisma.catalog.create({ data })
  }

  async page(data: { limit: number, page: number }) {
    let [list, pagination] = await this.prisma.pg().catalog.paginate().withPages({ includePageCount: true, ...data })
    return {
      list,
      pagination,
    }
  }

  async findById (data: Prisma.CatalogFindUniqueArgs) {
    return await this.prisma.catalog.findUnique(data)
  }

  async findAll(data: Prisma.CatalogFindManyArgs) {
    return await this.prisma.catalog.findMany(data)
  }

  async remove(where: Prisma.CatalogWhereUniqueInput) {
    return await this.prisma.catalog.delete({ where }).then(() => {
      return true
    })
  }
}

@Injectable()
export class SubCatalogService {
  constructor (private prisma: PrismaService) {}

  async create (data: Prisma.SubCatalogCreateInput) {
    return await this.prisma.subCatalog.create({ data })
  }

  async page(data: { limit: number, page: number }) {
    const [list, pagination] = await this.prisma.pg().subCatalog.paginate().withPages({ includePageCount: true, ...data })
    return {
      list,
      pagination,
    }
  }

  async findListById(data: Prisma.SubCatalogFindManyArgs) {
    return await this.prisma.subCatalog.findMany(data)
  }

  async findById (data: Prisma.SubCatalogFindUniqueArgs) {
    return await this.prisma.subCatalog.findUnique(data)
  }
  async remove(where: Prisma.SubCatalogWhereUniqueInput) {
    return await this.prisma.subCatalog.delete({ where }).then(() => {
      return true
    })
  }

  async findAll(data: Prisma.SubCatalogFindManyArgs) {
    return await this.prisma.subCatalog.findMany(data)
  }
}