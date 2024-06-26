import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsOptional } from 'class-validator'

export class CreateBrandDto {
	@ApiProperty({
		description: '产品品牌'
	})
	@IsNotEmpty({ message: '品牌名不能为空' })
	brandName: string

	@ApiProperty({
		description: 'logo'
	})
	@IsOptional()
	logo: string
}
