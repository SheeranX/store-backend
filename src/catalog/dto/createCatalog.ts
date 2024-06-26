import { ApiProperty, IntersectionType } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString, Length } from "class-validator";

export class CatalogDto {
  @ApiProperty({ description: '大类名' })
  @IsNotEmpty({ message: '大类名不能为空' })
  @Length(1, 30, { message: '大类名最少1位,不超过30位' })
  name: string

  @ApiProperty({
		description: '图片'
	})
	imgUrl: string
}

export class SubCatalogDto {
  @ApiProperty({ description: '小类名' })
  @IsNotEmpty({ message: '小类名不能为空' })
  @Length(1, 30, { message: '小类名最少1位,不超过30位' })
  name: string

  @ApiProperty({ description: '大类ID' })
  @IsNotEmpty({ message: '大类ID不能为空' })
  catalogId: string

  @ApiProperty({
		description: '图片'
	})
  @IsString()
	imgUrl: string
}

class AdditionalId {
  @ApiProperty({ description: '小类id' })
  @IsNumber()
  id: number
}

export class UpdateSubCatalogDto extends IntersectionType(SubCatalogDto, AdditionalId) {}