import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, Length } from 'class-validator'

export class CreateUserDto {
  @ApiProperty({
    description: '用户名',
  })
  @IsNotEmpty({ message: '用户名不能为空' })
  @Length(4, 30, { message: '用户名最少4位，不超过30位' })
  username: string

  @ApiProperty({
    description: '密码',
  })
  @IsNotEmpty({ message: '密码不能为空' })
  @Length(8, 20, { message: '密码最少8位，不超过20位' })
  password: string

  @ApiProperty({
    description: '昵称'
  })
  @Length(8, 10, { message: '昵称最少8位，不超过10位' })
  nickName?: string

  @ApiProperty({
    description: '用户ID'
  })
  userId?: string
}
