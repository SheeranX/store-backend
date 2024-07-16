import {
	Body,
	Controller,
	Get,
	Param,
	ParseIntPipe,
	Post,
	Req,
	Query
} from '@nestjs/common'
import { MiniProductService } from './product.service'
import {
	ApiOperation,
	ApiParam,
	ApiProperty,
	ApiTags,
	ApiQuery
} from '@nestjs/swagger'

@ApiTags('MiniProduct')
@Controller('miniProduct')
export class MiniProductController {
	constructor(private readonly productService: MiniProductService) {}

	@ApiProperty({ description: '分页获取类目' })
	@ApiParam({
		name: 'page',
		description: '页码',
		required: true
	})
	@ApiParam({
		name: 'limit',
		description: '每页数量',
		required: true
	})
	@Post('/page/:page/:limit')
	async page(
		@Param('page', ParseIntPipe) page: number,
		@Param('limit', ParseIntPipe) limit: number
	) {
		return await this.productService.page({ page, limit })
	}

	@ApiProperty({ description: '搜索' })
	@ApiParam({
		name: 'key',
		description: '关键字',
		required: false
	})
	@Get('/search')
	async search(@Query('key') key: string) {
		return await this.productService.search(key)
	}

	@ApiQuery({
		name: 'id',
		description: '根据id查询',
		required: false
	})
	@Get('/findById')
	async findById(@Query('id', ParseIntPipe) id: number) {
		return await this.productService.findById(id)
	}

	@ApiQuery({
		name: 'subCatalogId',
		description: '根据subCatalogId查询',
		required: false
	})
	@Get('/findListBySubCatalogId')
	async findList(
		@Query('subCatalogId') subCatalogId: string
	) {
		return await this.productService.findList({
			subCatalogId
		})
	}

	@ApiProperty({ description: '获取热门推荐' })
	@Get('/hotList')	
  async getHostList () {
    return await this.productService.getHotList()
  }

  @ApiProperty({ description: '获取最新数据列表' })
	@Get('/newList')	
  async getNewList () {
    return await this.productService.getNewList()
  }

  @ApiProperty({ description: '获取特价列表' })
	@Get('/discountList')
  async getDiscountList () {
    return await this.productService.getDiscountList()
  }
}
