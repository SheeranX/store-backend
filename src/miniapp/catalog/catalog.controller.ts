import { Controller, Get } from '@nestjs/common'
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
}