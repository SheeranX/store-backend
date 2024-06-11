import { ApiProperty } from '@nestjs/swagger'
import { CreateBrandDto } from './createBrandDto'

export class GetOrderDto extends CreateBrandDto {
  @ApiProperty({
    description: '品牌id',
  })
  brandId: number
}
