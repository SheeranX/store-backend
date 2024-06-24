import { Prisma } from "@prisma/client";
import { PrismaService } from "../prisma/prisma.service";
import { Injectable, forwardRef, Inject } from "@nestjs/common";
import { CatalogService, SubCatalogService } from "src/catalog/catalog.service";
import { FileService } from "src/file/file.service";
import { UpdateProductDto } from "./dto/updateProductDto";

@Injectable()
export class ProductService {
  constructor (private prisma: PrismaService, private catalogService: CatalogService, private subCatalogService: SubCatalogService, @Inject(forwardRef(() => FileService)) private fileService: FileService) {}
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

  async remove(where: Prisma.ProductWhereUniqueInput) {
    const res = await this.prisma.product.delete({ where })
    // 产品删除时，同时删除对应图片文件
    const { details, imgUrls, ref } = res
    await this.fileService.removeMany(details)
    await this.fileService.removeMany(imgUrls)
    await this.fileService.removeMany(ref)
    return true
  }

  async update(where: Prisma.ProductWhereUniqueInput, data: Prisma.ProductUpdateInput) {
    return await this.prisma.product.update({ where, data })
  }

  async findByUrl (url) {
    url = url.replace(/^\/upload\//, '')
    return await this.prisma.product.findMany({
      where: {
        OR: [
          {
            imgUrls: {
              contains: url,
            }
          },
          {
            ref: {
              contains: url,
            }
          },
          {
            details: {
              contains: url,
            }
          }
        ]
      }
    })
  }
}