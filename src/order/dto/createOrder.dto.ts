import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty } from 'class-validator'
import { OrderStatus, OrderItem } from '@prisma/client'

export class CreateOrderDto {
  @ApiProperty({
    description: '总价',
  })
  @IsNotEmpty({ message: '总价' })
  totalAmount: number

  status?: OrderStatus
  addressId: number
}
