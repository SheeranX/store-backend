import { ApiProperty } from '@nestjs/swagger'

export class createProductSkuDto {
	productId: string

	@ApiProperty({
		description: '所有规格id'
	})
	skuIds: string

  @ApiProperty({
		description: '规格名'
	})
	text: string
}
