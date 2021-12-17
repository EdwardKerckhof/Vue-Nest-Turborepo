import { ApiProperty } from '@nestjs/swagger'
import { Min } from 'class-validator'

export class CreatePostDto {
  @ApiProperty()
  @Min(3)
  title: string

  @ApiProperty({ required: false })
  content?: string

  @ApiProperty({ required: false, default: false })
  published?: boolean
}
