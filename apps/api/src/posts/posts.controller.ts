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
    @Query('cursor') cursor?: Prisma.PostWhereUniqueInput,
    @Query('where') where?: Prisma.PostWhereInput,
    @Query('orderBy') orderBy?: Prisma.PostOrderByWithRelationInput
  ): Promise<PostEntity[]> {
    const posts = await this.postsService.findAll({ cursor, where, orderBy })
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
