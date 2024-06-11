import { Body, Controller, Post, UseGuards, Param, ParseIntPipe, Get, Delete } from '@nestjs/common'
import { BrandService } from './brand.service'
import { ApiBearerAuth, ApiBody, ApiOperation, ApiParam, ApiProperty, ApiTags, ApiResponse } from '@nestjs/swagger'
import { JwtGuard } from 'src/guards/jwt/jwt.guard'
import { CreateBrandDto } from './dto/createBrandDto'
import { JwtPayload } from 'src/auth/jwtPayload.interface'

@ApiTags('Brand')
@Controller('brand')
@UseGuards(JwtGuard)
@ApiBearerAuth()
export class BrandController {
	constructor(private readonly brandService: BrandService) {}

	@ApiOperation({ summary: '创建产品' })
	@ApiBody({ description: '创建产品', type: CreateBrandDto })
	@Post('/create')
	async create(@Body() CreateBrandDto: CreateBrandDto) {
		return await this.brandService.create({
			...CreateBrandDto
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
    return await this.brandService.page({ page, limit })
  }

  @ApiOperation({ summary: '获取所有品牌列表' })
  @Get('/list/all')
  async findAll() {
    return await this.brandService.findAll({})
  }

  @ApiOperation({ summary: '删除品牌' })
  @ApiParam({
    name: 'id',
    description: 'id',
    required: true,
  })
  @Delete('/delete/:id')
  async remove(@Param('id') id: number) {
    return await this.brandService.remove({ id: +id })
  }
}
