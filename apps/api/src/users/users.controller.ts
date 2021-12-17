import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post
} from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { Prisma, User } from '@prisma/client'

import { UsersService } from './users.service'

@Controller('users')
@ApiTags('Users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() data: Prisma.UserCreateInput): Promise<User> {
    return this.usersService.create(data)
  }

  @Get()
  findAll(
    @Param('params')
    params: {
      skip?: number
      take?: number
      cursor?: Prisma.UserWhereUniqueInput
      where?: Prisma.UserWhereInput
      orderBy?: Prisma.UserOrderByWithRelationInput
    }
  ): Promise<User[]> {
    return this.usersService.findAll(params)
  }

  @Get(':id')
  findOne(
    @Param('userWhereUniqueInput')
    userWhereUniqueInput: Prisma.UserWhereUniqueInput
  ): Promise<User | null> {
    return this.usersService.findOne(userWhereUniqueInput)
  }

  @Patch(':id')
  update(
    @Body()
    params: {
      where: Prisma.UserWhereUniqueInput
      data: Prisma.UserUpdateInput
    }
  ): Promise<User> {
    return this.usersService.update(params)
  }

  @Delete(':id')
  remove(
    @Param('where')
    where: Prisma.UserWhereUniqueInput
  ): Promise<User> {
    return this.usersService.remove(where)
  }
}
