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
import { Prisma } from '@prisma/client'

import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { UserEntity } from './entities/user.entity'
import { UsersService } from './users.service'

@Controller('users')
@ApiTags('Users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiCreatedResponse({ type: UserEntity })
  async create(@Body() createUserDto: CreateUserDto): Promise<UserEntity> {
    return new UserEntity(await this.usersService.create(createUserDto))
  }

  @Get()
  @ApiOkResponse({ type: [UserEntity] })
  async findAll(
    @Query('cursor') cursor?: Prisma.PostWhereUniqueInput,
    @Query('where') where?: Prisma.PostWhereInput,
    @Query('orderBy') orderBy?: Prisma.PostOrderByWithRelationInput
  ): Promise<UserEntity[]> {
    const users = await this.usersService.findAll({
      cursor,
      where,
      orderBy
    })
    return users.map((user) => new UserEntity(user))
  }

  @Get(':id')
  @ApiOkResponse({ type: UserEntity })
  async findOne(@Param('id') id: string): Promise<UserEntity | null> {
    return new UserEntity(await this.usersService.findOne({ id: +id }))
  }

  @Patch(':id')
  @ApiCreatedResponse({ type: UserEntity })
  async update(
    @Param('id') id: string,
    @Body() data: UpdateUserDto
  ): Promise<UserEntity> {
    return new UserEntity(await this.usersService.update({ id: +id }, data))
  }

  @Delete(':id')
  @ApiOkResponse({ type: UserEntity })
  async remove(@Param('id') id: string): Promise<UserEntity> {
    return new UserEntity(await this.usersService.remove({ id: +id }))
  }
}
