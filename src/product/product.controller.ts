import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common'
import { ProductService } from './product.service'
import { CreateProductDto } from './dto/createProduct'
import { ApiBearerAuth, ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger'
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
		return await this.productService.create({
			...createProductDto,
			brand: {
				connect: { brandId: createProductDto.brandId }
			}
		})
	}
}
