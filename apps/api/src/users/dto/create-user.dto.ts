import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsNotEmpty, Min, MinLength } from 'class-validator'

export class CreateUserDto {
  @ApiProperty()
  @IsEmail()
  email: string

  @ApiProperty()
  @IsNotEmpty()
  @MinLength(3)
  name: string
}
