import { Prisma } from "@prisma/client";
import { PrismaService } from "../../prisma/prisma.service";
import { Injectable } from "@nestjs/common";
import { CatalogService, SubCatalogService } from "src/catalog/catalog.service";

@Injectable()
export class MiniProductService {
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

  async search (key) {
    // 模糊查询小类id
    const subCategeories = await this.prisma.subCatalog.findMany({
      where: {
        name: key
      },
      select: {
        subCatalogId: true
      }
    })
    // 模糊查询大类id
    const categeories = await this.prisma.catalog.findMany({
      where: {
        name: key
      },
      select: {
        catalogId: true
      }
    })
    const subCategoryIds = subCategeories.map(item => item.subCatalogId)
    const catalogIds = categeories.map(item => item.catalogId)

    const data = await this.prisma.product.findMany({
      where: {
        OR: [
          {
            title: {
              contains: key
            }
          },
          {
            desc: {
              contains: key
            }
          },
          {
            catalogId: {
              in: catalogIds
            }
          },
          {
            subCatalogId: {
              in: subCategoryIds
            }
          }
        ]
      }
    })
    return data
  }

  async findById (id) {
    const data = await this.prisma.product.findUnique({ where: { id } })
    const catalog = await this.catalogService.findById({ where: { catalogId: data.catalogId } })
    const subCatalog = await this.subCatalogService.findById({ where: { subCatalogId: data.subCatalogId } })
    return {
      ...data,
      catalogName: catalog.name,
      subCatalogName: subCatalog.name
    }
  }
}