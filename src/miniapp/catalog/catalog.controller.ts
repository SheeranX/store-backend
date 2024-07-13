import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common'
import { MiniSubCatalogService } from './catalog.service'
import { ApiOperation, ApiTags } from '@nestjs/swagger'


@ApiTags('miniSubCatalog')
@Controller('miniSubCatalog')
export class MiniSubCatalogController {
	constructor(private readonly subCatalogService: MiniSubCatalogService) {}

  @ApiOperation({ summary: '获取所有小类列表' })
  @Get('/list/all')
  async findAll() {
    return await this.subCatalogService.findAll({})
  }

  @ApiOperation({ summary: '获取所有大类列表' })
  @Get('/list/catalog')
  async findCatalogList() {
    return await this.subCatalogService.findCatalogList({})
  }

  @ApiOperation({ summary: '获取所有小类列表' })
  @Get('/findSubCatalogById/:id')
  async findSubCatalogById(@Param('id') id: string) {
    return await this.subCatalogService.findSubCatalogById({ where: { catalogId: id } })
  }
}