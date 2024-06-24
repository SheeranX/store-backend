import { Body, Controller, Delete, Param, ParseIntPipe, Post, Query, Req, UseGuards, Put } from '@nestjs/common'
import { ProductService } from './product.service'
import { CreateProductDto } from './dto/createProduct'
import { ApiBearerAuth, ApiBody, ApiOperation, ApiParam, ApiProperty, ApiTags, ApiResponse } from '@nestjs/swagger'
import { Prisma } from '@prisma/client'
import { JwtGuard } from 'src/guards/jwt/jwt.guard'
import { JwtPayload } from 'src/auth/jwtPayload.interface'
import { UpdateProductDto } from './dto/updateProductDto'
import { QueryProductDto } from './dto/queryProductDto'

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
	
  @ApiOperation({ summary: '根据id更新产品' })
  @ApiParam({
    name: 'id',
    description: '产品id',
    required: true,
  })
  @ApiBody({
    description: '更新产品',
    type: UpdateProductDto,
  })
  @ApiResponse({
    type: QueryProductDto,
  })
  @Put('/update/:id')
  async update(@Param('id') id: number, @Body() body: UpdateProductDto) {
    const { brandId, ...params } = body
    return await this.productService.update({ id }, {
      ...params,
      brand: {
        connect: {
          brandId
        }
      }
    })
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
