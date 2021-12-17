import { Post, Prisma } from '@prisma/client'
import { UpdatePostDto } from 'src/posts/dto/update-post.dto'

import { CreatePostDto } from '../posts/dto/create-post.dto'

export interface IPostService {
  create(createPostDto: CreatePostDto): Promise<Post>
  findAll(params: {
    take?: number
    skip?: number
    cursor?: Prisma.PostWhereUniqueInput
    where?: Prisma.PostWhereInput
    orderBy?: Prisma.PostOrderByWithRelationInput
  }): Promise<Post[]>
  findOne(
    userWhereUniqueInput: Prisma.PostWhereUniqueInput
  ): Promise<Post | null>
  update(where: Prisma.PostWhereUniqueInput, data: UpdatePostDto): Promise<Post>
  remove(where: Prisma.PostWhereUniqueInput): Promise<Post>
}
