import { Body, Controller, Delete, Param, ParseIntPipe, Post, Req, UseGuards } from '@nestjs/common'
import { ProductService } from './product.service'
import { CreateProductDto } from './dto/createProduct'
import { ApiBearerAuth, ApiBody, ApiOperation, ApiParam, ApiProperty, ApiTags } from '@nestjs/swagger'
import { JwtGuard } from 'src/guards/jwt/jwt.guard'

@ApiTags('Product')
@Controller('product')
@UseGuards(JwtGuard)
@ApiBearerAuth()
export class ProductController {
	constructor(private readonly productService: ProductService) {}

	@ApiOperation({ summary: '创建产品' })
	@ApiBody({ description: '创建产品', type: CreateProductDto })
	@Post('/create')
	async create(@Body() createProductDto: CreateProductDto) {
		const { brandId, ...params } = createProductDto
		return await this.productService.create({
			...params,
			brand: {
				connect: { brandId }
			}
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
    return await this.productService.page({ page, limit })
  }
	
	@ApiProperty({ description: '删除产品' })
	@ApiParam({
    name: 'id',
    description: 'id',
    required: true,
  })
	@Delete('/delete/:id')
	async remove(@Param('id') id: number) {
    return await this.productService.remove({ id: +id })
  }
}
