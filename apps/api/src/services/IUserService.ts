import { Connection } from '@devoxa/prisma-relay-cursor-connection'
import { Prisma, User } from '@prisma/client'

import { CreateUserDto } from '../users/dto/create-user.dto'
import { UpdateUserDto } from '../users/dto/update-user.dto'

export interface IUserService {
  create(createUserDto: CreateUserDto): Promise<User>
  findAll(params: {
    cursor?: Prisma.UserWhereUniqueInput
    where?: Prisma.UserWhereInput
    orderBy?: Prisma.UserOrderByWithRelationInput
  }): Promise<User[]>
  findOne(
    userWhereUniqueInput: Prisma.UserWhereUniqueInput
  ): Promise<User | null>
  update(where: Prisma.UserWhereUniqueInput, data: UpdateUserDto): Promise<User>
  remove(where: Prisma.UserWhereUniqueInput): Promise<User>
}
