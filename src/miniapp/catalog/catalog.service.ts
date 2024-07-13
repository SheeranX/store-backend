import { Prisma } from "@prisma/client";
import { PrismaService } from "../../prisma/prisma.service";
import { Injectable } from "@nestjs/common";


@Injectable()
export class MiniSubCatalogService {
  constructor (private prisma: PrismaService) {}
  async findAll(data: Prisma.SubCatalogFindManyArgs) {
    return await this.prisma.subCatalog.findMany(data)
  }

  async findCatalogList(data: Prisma.CatalogFindManyArgs) {
    return await this.prisma.catalog.findMany(data)
  }

  // 根据catalogId 查 subcatalog
  async findSubCatalogById(data: Prisma.SubCatalogFindManyArgs) {
    return await this.prisma.subCatalog.findMany(data)
  }
}