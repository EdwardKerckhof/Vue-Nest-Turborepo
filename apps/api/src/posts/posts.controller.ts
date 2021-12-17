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
import { Post as PostModel, Prisma } from '@prisma/client'

import { PostsService } from './posts.service'

@Controller('posts')
@ApiTags('Posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post()
  create(@Body() data: Prisma.PostCreateInput): Promise<PostModel> {
    return this.postsService.create(data)
  }

  @Get()
  findAll(
    @Body('params')
    params: {
      skip?: number
      take?: number
      cursor?: Prisma.PostWhereUniqueInput
      where?: Prisma.PostWhereInput
      orderBy?: Prisma.PostOrderByWithRelationInput
    }
  ): Promise<PostModel[]> {
    return this.postsService.findAll(params)
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<PostModel | null> {
    return this.postsService.findOne({ id: +id })
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() data: Prisma.PostUpdateInput
  ): Promise<PostModel> {
    return this.postsService.update({ id: +id }, data)
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<PostModel> {
    return this.postsService.remove({ id: +id })
  }
}
