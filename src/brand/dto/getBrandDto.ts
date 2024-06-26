import { ApiProperty } from '@nestjs/swagger'
import { CreateBrandDto } from './createBrandDto'
import { IsString } from 'class-validator'

export class GetBrandDto extends CreateBrandDto {
  @ApiProperty({
    description: '品牌id',
  })
  brandId: number

  @ApiProperty({
    description: '品牌id',
  })
  id: number

  @ApiProperty({
    description: '品牌名',
  })
  brandName: string

  @ApiProperty({
    description: 'logo',
  })
  @IsString()
  logo: string
}
