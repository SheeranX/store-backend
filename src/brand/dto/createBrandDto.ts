import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsString, Length } from 'class-validator'

export class CreateBrandDto {
	@ApiProperty({
		description: '产品品牌'
	})
	@IsNotEmpty({ message: '品牌名不能为空' })
	brandName: string

	@ApiProperty({
		description: 'logo'
	})
	logo: string
}
