import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, Length } from 'class-validator'

export class CreateBrandDto {
	@ApiProperty({
		description: '产品品牌'
	})
	@IsNotEmpty({ message: '品牌名不能为空' })
	brandName: string
}
