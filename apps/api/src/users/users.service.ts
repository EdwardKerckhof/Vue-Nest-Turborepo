import { Injectable } from '@nestjs/common'
import { Prisma, User } from '@prisma/client'
import { IUserService } from 'src/services/IUserService'
import { FindAllUsersArgs } from 'src/types/args/find-all-args.dto'

import { PrismaService } from '../prisma/prisma.service'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'

@Injectable()
export class UsersService implements IUserService {
  constructor(private prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    return this.prisma.user.create({
      data: createUserDto
    })
  }

  async findAll(params: FindAllUsersArgs): Promise<User[]> {
    const { take, skip, cursor, where, orderBy } = params
    return this.prisma.user.findMany({
      take,
      skip,
      cursor,
      where,
      orderBy
    })
  }

  async findOne(
    userWhereUniqueInput: Prisma.UserWhereUniqueInput
  ): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: userWhereUniqueInput
    })
  }

  async update(
    where: Prisma.UserWhereUniqueInput,
    data: UpdateUserDto
  ): Promise<User> {
    return this.prisma.user.update({ data, where })
  }

  async remove(where: Prisma.UserWhereUniqueInput): Promise<User> {
    return this.prisma.user.delete({
      where
    })
  }
}
