import { ApiProperty } from '@nestjs/swagger'
import { Post } from '@prisma/client'

export class PostEntity implements Post {
  @ApiProperty()
  id: number

  @ApiProperty()
  title: string

  @ApiProperty({ required: false, nullable: true })
  content: string

  @ApiProperty({ required: false, default: false })
  published: boolean

  @ApiProperty()
  authorId: number
}
