import { Body, Post, Req } from '@nestjs/common'
import { ProductService } from './product.service'
import { CreateProductDto } from './dto/createProduct'
import { ApiBody, ApiOperation } from '@nestjs/swagger'

export class ProductController {
	constructor(private readonly productService: ProductService) {}

	@ApiOperation({ summary: '创建产品' })
	@ApiBody({ description: '创建产品', type: CreateProductDto })
	@Post()
	async create(@Body() createProductDto: CreateProductDto) {
		return await this.productService.create({
			...createProductDto,
			brand: {
				connect: { brandId: createProductDto.brandId }
			},
			catalog: {
				connect: { catalogId: createProductDto.catalogId }
			},
			subCatalog: {
				connect: { subCatalogId: createProductDto.subCatalogId }
			}
		})
	}
}
