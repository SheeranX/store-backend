import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsString } from 'class-validator'

export class UpdateBrandDto {
	@ApiProperty({
		description: '产品品牌'
	})
	@IsNotEmpty({ message: '品牌名不能为空' })
	brandName: string

	@ApiProperty({
		description: 'logo'
	})
  @IsString()
	logo?: string

  @ApiProperty({
		description: 'id'
	})
  @IsNotEmpty({ message: 'id不能为空' })
	id: number
}
