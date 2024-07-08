import { ApiProperty } from '@nestjs/swagger'

export class QueryProductDto {
	@ApiProperty({
		description: '产品编号'
	})
	productId: string

	@ApiProperty({
		description: '产品名称'
	})
	title: string

	@ApiProperty({
		description: '大类'
	})
	catalogId: string

  @ApiProperty({
		description: '大类名'
	})
	catalogName: string


	@ApiProperty({
		description: '小类'
	})
	subCatalogId: string

  @ApiProperty({ description: '小类名称' })
  subCatalogName: string

	@ApiProperty({
		description: '描述'
	})
	desc: string

	@ApiProperty({
		description: '详情图片'
	})
	details: string

	@ApiProperty({
		description: '库存'
	})
	stock: number

	@ApiProperty({
		description: '轮播图'
	})
	imgUrls: string

	@ApiProperty({
		description: '规格图'
	})
	ref: string

	@ApiProperty({ description: '产品规格' })
	productSkuIds: string

  @ApiProperty({ description: '品牌id' })
  brandId: string

}
