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
import { FindAllPostsArgs } from 'src/types/args/find-all-args.dto'

import { CreatePostDto } from './dto/create-post.dto'
import { UpdatePostDto } from './dto/update-post.dto'
import { PostEntity } from './entities/post.entity'
import { PostsService } from './posts.service'

@Controller('posts')
@ApiTags('Posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post()
  @ApiCreatedResponse({ type: PostEntity })
  async create(@Body() data: CreatePostDto): Promise<PostEntity> {
    return new PostEntity(await this.postsService.create(data))
  }

  @Get()
  @ApiOkResponse({ type: [PostEntity] })
  async findAll(
    @Query() findAllPostsArgs: FindAllPostsArgs
  ): Promise<PostEntity[]> {
    const { take, skip, cursor, where, orderBy } = findAllPostsArgs
    const posts = await this.postsService.findAll({
      take: +take || 10,
      skip: +skip || 0,
      cursor,
      where,
      orderBy
    })
    return posts.map((post) => new PostEntity(post))
  }

  @Get(':id')
  @ApiOkResponse({ type: PostEntity })
  async findOne(@Param('id') id: string): Promise<PostEntity | null> {
    return new PostEntity(await this.postsService.findOne({ id: +id }))
  }

  @Patch(':id')
  @ApiCreatedResponse({ type: PostEntity })
  async update(
    @Param('id') id: string,
    @Body() data: UpdatePostDto
  ): Promise<PostEntity> {
    return new PostEntity(await this.postsService.update({ id: +id }, data))
  }

  @Delete(':id')
  @ApiOkResponse({ type: PostEntity })
  async remove(@Param('id') id: string): Promise<PostEntity> {
    return new PostEntity(await this.postsService.remove({ id: +id }))
  }
}
