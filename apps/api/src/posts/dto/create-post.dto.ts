import { ApiProperty } from '@nestjs/swagger'
import { IsBoolean, IsNotEmpty, MaxLength, MinLength } from 'class-validator'

export class CreatePostDto {
  @ApiProperty()
  @IsNotEmpty()
  @MinLength(3)
  title: string

  @ApiProperty({ required: false, nullable: true })
  @MaxLength(500)
  content?: string

  @ApiProperty({ required: false, default: false })
  @IsBoolean()
  published?: boolean
}
