import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query
} from '@nestjs/common'
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger'
import { Prisma, User } from '@prisma/client'

import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { UsersService } from './users.service'

@Controller('users')
@ApiTags('Users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiCreatedResponse()
  create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.usersService.create(createUserDto)
  }

  @Get()
  @ApiOkResponse()
  findAll(
    @Query('cursor') cursor?: Prisma.PostWhereUniqueInput,
    @Query('where') where?: Prisma.PostWhereInput,
    @Query('orderBy') orderBy?: Prisma.PostOrderByWithRelationInput
  ): Promise<User[]> {
    return this.usersService.findAll({
      cursor,
      where,
      orderBy
    })
  }

  @Get(':id')
  @ApiOkResponse()
  findOne(@Param('id') id: string): Promise<User | null> {
    return this.usersService.findOne({ id: +id })
  }

  @Patch(':id')
  @ApiCreatedResponse()
  update(@Param('id') id: string, @Body() data: UpdateUserDto): Promise<User> {
    return this.usersService.update({ id: +id }, data)
  }

  @Delete(':id')
  @ApiOkResponse()
  remove(@Param('id') id: string): Promise<User> {
    return this.usersService.remove({ id: +id })
  }
}
