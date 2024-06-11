import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class CreateSkuDto {
  @ApiProperty({
    description: '规格'
  })
  @IsNotEmpty({
    message: '规格名不能为空'
  })
  text: string
}