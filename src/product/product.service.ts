import { Prisma } from "@prisma/client";
import { PrismaService } from "../prisma/prisma.service";
import { Injectable } from "@nestjs/common";
import { CatalogService, SubCatalogService } from "src/catalog/catalog.service";

@Injectable()
export class ProductService {
  constructor (private prisma: PrismaService, private catalogService: CatalogService, private subCatalogService: SubCatalogService) {}
  async create (data: Prisma.ProductCreateInput) {
    return await this.prisma.product.create({ data })
  }

  async page(data: { limit: number, page: number }) {
    let [list, pagination] = await this.prisma.pg().product.paginate({
      include: {
        brand: true,
      }
    }).withPages({ includePageCount: true, ...data })
    const catalogIds = list.map(item => item.catalogId)
    const subCatalogIds = list.map(item => item.subCatalogId)
    const catalogList = await this.catalogService.findAll({
      where: {
        catalogId: {
          in: catalogIds
        }
      }
    })
    const catalogIdsMap = catalogList.reduce((obj, cur) => {
      obj[cur.catalogId] = cur.name
      return obj
    }, {})
    console.log(catalogIdsMap, 'catalogList')
    const subCatalogList = await this.subCatalogService.findAll({
      where: {
        subCatalogId: {
          in: subCatalogIds
        }
      }
    })
    const subCatalogIdMap = subCatalogList.reduce((obj, cur) => {
      obj[cur.subCatalogId] = cur.name
      return obj
    }, {})
    list = list.map(item => ({
      ...item,
      brandName: item.brand.brandName,
      catalogName: catalogIdsMap[item.catalogId],
      subCatalogName: subCatalogIdMap[item.subCatalogId]
     }))
    return {
      list,
      pagination,
    }
  }

  async remove(where: Prisma.ProductWhereUniqueInput) {
    return await this.prisma.product.delete({ where }).then(() => {
      return true
    })
  }
}