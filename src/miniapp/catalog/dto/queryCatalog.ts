import { ApiProperty } from '@nestjs/swagger'

export class QueryCatalogDto {
	@ApiProperty({
		description: '小类'
	})
	subCatalogId: string

  @ApiProperty({ description: '小类名称' })
  subCatalogName: string
}
