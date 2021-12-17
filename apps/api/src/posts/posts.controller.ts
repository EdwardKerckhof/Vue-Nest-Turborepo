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
import { Post as PostModel, Prisma } from '@prisma/client'

import { PostsService } from './posts.service'

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post()
  create(@Body() data: Prisma.PostCreateInput): Promise<PostModel> {
    return this.postsService.create(data)
  }

  @Get()
  findAll(
    @Query('take') take?: number,
    @Query('skip') skip?: number,
    @Query('cursor') cursor?: Prisma.PostWhereUniqueInput,
    @Query('where') where?: Prisma.PostWhereInput,
    @Query('orderBy') orderBy?: Prisma.PostOrderByWithRelationInput
  ): Promise<PostModel[]> {
    return this.postsService.findAll({ skip, take, cursor, where, orderBy })
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
