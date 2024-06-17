import { Body, Controller, Post, UseGuards, Param, ParseIntPipe, Get, Delete, Req } from '@nestjs/common'
import { CatalogService, SubCatalogService } from './catalog.service'
import { ApiBearerAuth, ApiBody, ApiOperation, ApiParam, ApiProperty, ApiTags, ApiResponse } from '@nestjs/swagger'
import { JwtGuard } from 'src/guards/jwt/jwt.guard'
import { CatalogDto, SubCatalogDto } from './dto/createCatalog'
import { JwtPayload } from 'src/auth/jwtPayload.interface'

@ApiTags('Catalog')
@Controller('catalog')
@UseGuards(JwtGuard)
@ApiBearerAuth()
export class CatalogController {
	constructor(private readonly catalogService: CatalogService) {}

	@ApiOperation({ summary: '创建类目' })
	@ApiBody({ description: '创建类目', type: CatalogDto })
	@Post('/create')
	async create(@Body() CreateCatalogDto: CatalogDto) {
		return await this.catalogService.create({
			...CreateCatalogDto
		})
	}

  @ApiProperty({ description: '分页获取品牌' })
  @ApiParam({
    name: 'page',
    description: '页码',
    required: true
  })
  @ApiParam({
    name: 'limit',
    description: '每页数量',
    required: true,
  })
  @Post('/page/:page/:limit')
  async page (
  @Param('page', ParseIntPipe) page: number,
  @Param('limit', ParseIntPipe) limit: number) {
    return await this.catalogService.page({ page, limit })
  }

  @ApiOperation({ summary: '获取单个大类' })
  @Get('/item/:id')
  async findById(@Param('id') catalogId: string) {
    return await this.catalogService.findById({ where: { catalogId } })
  }

  @ApiOperation({ summary: '获取所有大类列表' })
  @Get('/list/all')
  async findAll() {
    return await this.catalogService.findAll({})
  }

  @ApiOperation({ summary: '删除品牌' })
  @ApiParam({
    name: 'id',
    description: 'id',
    required: true,
  })
  @Delete('/delete/:id')
  async remove(@Param('id') id: number) {
    return await this.catalogService.remove({ id: +id })
  }
}

@ApiTags('SubCatalog')
@Controller('subCatalog')
@UseGuards(JwtGuard)
@ApiBearerAuth()
export class SubCatalogController {
	constructor(private readonly subCatalogService: SubCatalogService) {}

	@ApiOperation({ summary: '创建类目' })
	@ApiBody({ description: '创建类目', type: CatalogDto })
	@Post('/create')
	async create(@Body() CreateSubCatalogDto: SubCatalogDto) {
		return await this.subCatalogService.create({
			...CreateSubCatalogDto
		})
	}

  @ApiProperty({ description: '分页获取类目' })
  @ApiParam({
    name: 'page',
    description: '页码',
    required: true
  })
  @ApiParam({
    name: 'limit',
    description: '每页数量',
    required: true,
  })
  @Post('/page/:page/:limit')
  async page (
  @Param('page', ParseIntPipe) page: number,
  @Param('limit', ParseIntPipe) limit: number) {
    return await this.subCatalogService.page({ page, limit })
  }

  @ApiOperation({ summary: '获取所有小类列表' })
  @Get('/list/:id')
  async findListById(@Param('id') catalogId: string) {
    return await this.subCatalogService.findListById({ where: { catalogId } })
  }

  @ApiOperation({ summary: '获取单个小类' })
  @Get('/item/:id')
  async findById(@Param('id') subCatalogId: string) {
    return await this.subCatalogService.findById({ where: { subCatalogId } })
  }



  @ApiOperation({ summary: '删除类目' })
  @ApiParam({
    name: 'id',
    description: 'id',
    required: true,
  })
  @Delete('/delete/:id')
  async remove(@Param('id') id: number) {
    return await this.subCatalogService.remove({ id: +id })
  }
}