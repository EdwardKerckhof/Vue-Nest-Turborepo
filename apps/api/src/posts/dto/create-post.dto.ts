import { ApiProperty } from '@nestjs/swagger'
import { MinLength } from 'class-validator'

export class CreatePostDto {
  @ApiProperty()
  @MinLength(3)
  title: string

  @ApiProperty({ required: false })
  content?: string

  @ApiProperty({ required: false, default: false })
  published?: boolean
}
