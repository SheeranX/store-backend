import { PartialType } from '@nestjs/swagger'
import { CreateProductDto } from './createProduct'

export class UpdateProductDto extends PartialType(CreateProductDto) {}
