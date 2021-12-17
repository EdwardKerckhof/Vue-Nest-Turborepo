import { Injectable } from '@nestjs/common'
import { Post, Prisma } from '@prisma/client'

import { PrismaService } from '../prisma/prisma.service'

@Injectable()
export class PostsService {
  constructor(private prisma: PrismaService) {}

  async create(data: Prisma.PostCreateInput): Promise<Post> {
    return this.prisma.post.create({
      data
    })
  }

  async findAll(params: {
    skip?: number
    take?: number
    cursor?: Prisma.PostWhereUniqueInput
    where?: Prisma.PostWhereInput
    orderBy?: Prisma.PostOrderByWithRelationInput
  }): Promise<Post[]> {
    const { skip, take, cursor, where, orderBy } = params
    return this.prisma.post.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy
    })
  }

  async findOne(
    postWhereUniqueInput: Prisma.PostWhereUniqueInput
  ): Promise<Post | null> {
    return this.prisma.post.findUnique({
      where: postWhereUniqueInput
    })
  }

  async update(
    where: Prisma.PostWhereUniqueInput,
    data: Prisma.PostUpdateInput
  ): Promise<Post> {
    return this.prisma.post.update({
      data,
      where
    })
  }

  async remove(where: Prisma.PostWhereUniqueInput): Promise<Post> {
    return this.prisma.post.delete({
      where
    })
  }
}
