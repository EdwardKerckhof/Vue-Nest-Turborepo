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
import { ApiTags } from '@nestjs/swagger'
import { Post as PostModel, Prisma } from '@prisma/client'

import { CreatePostDto } from './dto/create-post.dto'
import { UpdatePostDto } from './dto/update-post.dto'
import { PostsService } from './posts.service'

@Controller('posts')
@ApiTags('Posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post()
  create(@Body() data: CreatePostDto): Promise<PostModel> {
    return this.postsService.create(data)
  }

  @Get()
  findAll(
    @Query('cursor') cursor?: Prisma.PostWhereUniqueInput,
    @Query('where') where?: Prisma.PostWhereInput,
    @Query('orderBy') orderBy?: Prisma.PostOrderByWithRelationInput
  ): Promise<PostModel[]> {
    return this.postsService.findAll({ cursor, where, orderBy })
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<PostModel | null> {
    return this.postsService.findOne({ id: +id })
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() data: UpdatePostDto
  ): Promise<PostModel> {
    return this.postsService.update({ id: +id }, data)
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<PostModel> {
    return this.postsService.remove({ id: +id })
  }
}
