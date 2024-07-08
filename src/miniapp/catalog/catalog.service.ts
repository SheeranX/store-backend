import { Prisma } from "@prisma/client";
import { PrismaService } from "../../prisma/prisma.service";
import { Injectable } from "@nestjs/common";


@Injectable()
export class MiniSubCatalogService {
  constructor (private prisma: PrismaService) {}
  async findAll(data: Prisma.SubCatalogFindManyArgs) {
    return await this.prisma.subCatalog.findMany(data)
  }
}