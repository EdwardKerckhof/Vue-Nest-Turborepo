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
import { Prisma, User } from '@prisma/client'

import { UsersService } from './users.service'

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() data: Prisma.UserCreateInput): Promise<User> {
    return this.usersService.create(data)
  }

  @Get()
  findAll(
    @Query('take') take?: number,
    @Query('skip') skip?: number, 
    @Query('cursor') cursor?: Prisma.PostWhereUniqueInput,
    @Query('where') where?: Prisma.PostWhereInput,
    @Query('orderBy') orderBy?: Prisma.PostOrderByWithRelationInput
  ): Promise<User[]> {
    return this.usersService.findAll({ skip, take, cursor, where, orderBy })
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
