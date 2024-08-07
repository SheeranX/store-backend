import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, Length, IsString, IsNumber, IsBoolean } from 'class-validator'

export class CreateProductDto {
	@ApiProperty({
		description: '产品编号'
	})
	@IsNotEmpty({ message: '产品编号不能为空' })
	@Length(4, 30, { message: '产品编号最少4位,不超过30位' })
	productId: string

	@ApiProperty({
		description: '产品名称'
	})
	@IsNotEmpty({ message: '产品名称不能为空' })
	@Length(1, 20, { message: '产品名称最少1位，不超过20位' })
	title: string

	@ApiProperty({
		description: '大类'
	})
	@IsNotEmpty({ message: '大类不能为空' })
	catalogId: string

	@ApiProperty({
		description: '小类'
	})
	@IsNotEmpty({ message: '小类不能为空' })
	subCatalogId: string

	@ApiProperty({
		description: '描述'
	})
	@IsNotEmpty({ message: '描述不能为空' })
	desc: string

	@ApiProperty({
		description: '详情图片'
	})
	@IsNotEmpty({ message: '详情图片' })
	details: string

	@ApiProperty({
		description: '库存'
	})
	@IsNotEmpty({ message: '库存' })
	stock: number

	@IsString()
	@ApiProperty({
		description: '轮播图'
	})
	@IsNotEmpty({ message: '轮播图不能为空' })
	imgUrls: string

	@ApiProperty({
		description: '规格图'
	})
	@IsNotEmpty({ message: '规格图不能为空' })
	ref: string

	@ApiProperty({ description: '产品规格' })
  @IsNotEmpty({ message: '产品规格不能为空' })
	productSkuIds: string

  @ApiProperty({ description: '品牌id' })
  @IsNotEmpty({ message: '品牌id不能为空' })
  brandId: string

	@ApiProperty({ description: '价格' })
  @IsNotEmpty({ message: '价格不能为空' })
	@IsNumber()
  price: number

	@ApiProperty({ description: '是否热门' })
	@IsNumber()
  isHot: number

	@ApiProperty({ description: '是否新品' })
	@IsNumber()
  isNew: number

	@ApiProperty({ description: '是否特价' })
	@IsNumber()
  isDiscount: number
}
