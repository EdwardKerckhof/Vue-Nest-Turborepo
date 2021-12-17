import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, Min } from 'class-validator'

export class CreateUserDto {
  @ApiProperty()
  @IsEmail()
  email: string

  @ApiProperty()
  @Min(3)
  name: string
}
