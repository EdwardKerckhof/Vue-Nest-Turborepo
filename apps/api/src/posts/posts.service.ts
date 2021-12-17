import { Injectable } from '@nestjs/common'
import { Post, Prisma } from '@prisma/client'
import { IPostService } from 'src/services/IPostService'

import { PrismaService } from '../prisma/prisma.service'
import { CreatePostDto } from './dto/create-post.dto'
import { UpdatePostDto } from './dto/update-post.dto'

@Injectable()
export class PostsService implements IPostService {
  constructor(private prisma: PrismaService) {}

  async create(createPostDto: CreatePostDto): Promise<Post> {
    return this.prisma.post.create({
      data: createPostDto
    })
  }

  async findAll(params: {
    cursor?: Prisma.PostWhereUniqueInput
    where?: Prisma.PostWhereInput
    orderBy?: Prisma.PostOrderByWithRelationInput
  }): Promise<Post[]> {
    const { cursor, where, orderBy } = params
    return this.prisma.post.findMany({
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
    data: UpdatePostDto
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
